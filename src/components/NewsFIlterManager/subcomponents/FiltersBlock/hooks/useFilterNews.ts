import { useEffect, useState } from 'react';
import { format, isAfter, startOfToday } from 'date-fns';

import { Filters, PartialVotedNewsArray } from 'types';

import {
  useChooseRenderingNews,
  useFilterCollector,
  useNewsAPICollector,
  useNewsDBCollector,
} from 'hooks';

import { applyCrossFilters } from '../assistants';

type FilterHookProps = {
  activeLinks: {
    isHomeActive: boolean;
    isFavoriteActive: boolean;
    isReadActive: boolean;
    isArchiveActive: boolean;
  };
  setIsOpenCalendar?: (value: React.SetStateAction<boolean>) => void;
};

const useFilterNews = ({ activeLinks, setIsOpenCalendar }: FilterHookProps) => {
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    title: '',
    author: '',
    publisher: '',
    materialType: '',
    selectedFilterDate: '',
  });
  const [hasDisabled, setHasDisabled] = useState<boolean>(false);

  const { showResultsState, getFilteredNews, resetAllFilters } = useFilterCollector();
  const { updateHeadline } = useNewsAPICollector();
  const { allFavourites, allReads } = useNewsDBCollector();
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  const today = startOfToday();
  const hasFilterValue = Object.values(filters).some((entry) => entry !== '');

  console.log(filters.selectedFilterDate, 'hasFilVal', hasFilterValue, '|| hasDis', hasDisabled);

  //useEffect следит за тем нужно ли отключать кнопку или нет.
  useEffect(() => {
    if (hasFilterValue) {
      setHasDisabled(false);
      return;
    }

    setHasDisabled(true);
  }, [hasFilterValue]);

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleMaterialTypeChange = (selectedType: string) => {
    setFilters({
      ...filters,
      materialType: selectedType,
    });
  };

  const handleFilterDate = (date: Date) => {
    if (!isAfter(date, today)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        selectedFilterDate: format(date, 'dd/MM/yyyy'),
      }));
      setIsOpenCalendar ? setIsOpenCalendar(false) : null;
    }
  };

  // console.log(filters);

  const handleFiltration = async (event: React.FormEvent) => {
    event.preventDefault();

    showResultsState('loading');
    if (activeLinks.isHomeActive) {
      updateHeadline('Filtered News');
    }

    if (
      rebuildedNews &&
      typeof rebuildedNews !== undefined &&
      rebuildedNews.length > 0
      // &&
      // hasFilterValue
    ) {
      if (activeLinks.isHomeActive) {
        const filteredNews = applyCrossFilters(rebuildedNews, filters);

        if (filteredNews && filteredNews.length > 0) {
          getFilteredNews(filteredNews);
          showResultsState('full');
        } else {
          showResultsState('empty');
        }
      } else if (activeLinks.isFavoriteActive) {
        const filteredNews = applyCrossFilters(allFavourites, filters);

        if (filteredNews) {
          getFilteredNews(filteredNews);
        }
      } else if (activeLinks.isReadActive) {
        const filteredNews = applyCrossFilters(allReads, filters);

        if (filteredNews) {
          getFilteredNews(filteredNews);
        }
      }
    }
    setFilters({
      keyword: '',
      title: '',
      author: '',
      publisher: '',
      materialType: '',
      selectedFilterDate: '',
    });
  };

  const handleSort = (order: string) => {
    if (rebuildedNews && rebuildedNews?.length > 0) {
      let sortedNews: PartialVotedNewsArray = [];
      if (activeLinks.isHomeActive) {
        sortedNews = [...rebuildedNews];
      } else if (activeLinks.isFavoriteActive) {
        sortedNews = [...allFavourites];
      } else if (activeLinks.isReadActive) {
        sortedNews = [...allReads];
      }

      sortedNews.sort((a, b) => {
        const formatDate = (dateStr: string | undefined) => {
          if (dateStr) {
            const [day, month, year] = dateStr.split('/').map(Number);
            return new Date(year, month - 1, day).getTime();
          }
          return 0;
        };
        const dateA = formatDate(a.publishDate);
        const dateB = formatDate(b.publishDate);

        if (order === 'asc') {
          return dateA - dateB;
        } else if (order === 'desc') {
          return dateB - dateA;
        }

        return 0;
      });
      getFilteredNews(sortedNews);
    }
  };

  const handleReset = async () => {
    updateHeadline("Today's Hot News");
    setFilters({
      keyword: '',
      title: '',
      author: '',
      publisher: '',
      materialType: '',
      selectedFilterDate: '',
    });
    resetAllFilters();
  };

  return {
    filters,
    hasDisabled,
    handleChangeFilter,
    handleFilterDate,
    handleMaterialTypeChange,
    handleFiltration,
    handleSort,
    handleReset,
  };
};

export default useFilterNews;
