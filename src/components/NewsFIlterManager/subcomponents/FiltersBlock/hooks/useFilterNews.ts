import { useEffect, useState } from 'react';
import { format, isAfter, startOfToday } from 'date-fns';

import { Filters, PartialVotedNewsArray } from 'types';

import {
  useChooseRenderingNews,
  useFilterCollector,
  useNewsAPICollector,
  useNewsDBCollector,
} from 'hooks';
import { ActiveLinks } from 'hooks/useActiveLinks';

import { applyCrossFilters } from '../assistants';

type FilterHookProps = {
  activeLinks: ActiveLinks;
  setIsOpenCalendar?: (value: React.SetStateAction<boolean>) => void;
  setSelectedMaterialType: (item: string) => void;
};

const useFilterNews = ({
  activeLinks,
  setIsOpenCalendar,
  setSelectedMaterialType,
}: FilterHookProps) => {
  const [beginDate, setBeginDate] = useState<Date | null>(null);

  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    title: '',
    author: '',
    publisher: '',
    materialType: '',
    selectedFilterDate: {
      startDate: '',
      endDate: '',
    },
  });
  const { showResultsState, getFilteredNews, resetAllFilters } = useFilterCollector();
  const { updateHeadline } = useNewsAPICollector();
  const { allFavourites, allReads } = useNewsDBCollector();
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  useEffect(() => {
    console.log(filters.selectedFilterDate);
  }, [filters]);

  const today = startOfToday();

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
    console.log('handleFilterDate', date);
    if (!isAfter(date, today)) {
      if (!beginDate) {
        setBeginDate(date);
      } else {
        try {
          let newSelectedDate: { beginDate: string; endDate: string };
          if (isAfter(date, beginDate)) {
            newSelectedDate = {
              beginDate: format(beginDate, 'dd/MM/yyyy'),
              endDate: format(date, 'dd/MM/yyyy'),
            };
          } else {
            newSelectedDate = {
              beginDate: format(date, 'dd/MM/yyyy'),
              endDate: format(beginDate, 'dd/MM/yyyy'),
            };
          }
          if (newSelectedDate.beginDate !== '' && newSelectedDate.endDate! == '') {
            setFilters({
              ...filters,
              selectedFilterDate: {
                startDate: newSelectedDate.beginDate,
                endDate: newSelectedDate.endDate,
              },
            });
            setIsOpenCalendar ? setIsOpenCalendar(false) : null;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleFiltration = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    showResultsState('loading');
    if (activeLinks.isHomeActive) {
      updateHeadline('Filtered News');
    }

    if (filters) {
      const hasFilterValue = Object.values(filters).some((entry) => entry !== '');
      // console.log('rebuildedNews', rebuildedNews);
      // console.log('rebuildedNews.length', rebuildedNews.length);
      console.log('hasFilterValue', hasFilterValue);
      console.log(filters);
      if (
        rebuildedNews &&
        typeof rebuildedNews !== undefined &&
        rebuildedNews.length > 0 &&
        hasFilterValue
      ) {
        if (activeLinks.isHomeActive) {
          console.log('rebuildedNews', rebuildedNews);
          const filteredNews = applyCrossFilters(rebuildedNews, filters);
          // console.log('filteredNews', filteredNews);

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
    }
    setFilters({
      keyword: '',
      title: '',
      author: '',
      publisher: '',
      materialType: '',
      selectedFilterDate: {
        startDate: '',
        endDate: '',
      },
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
      selectedFilterDate: {
        startDate: '',
        endDate: '',
      },
    });
    setSelectedMaterialType('');
    resetAllFilters();
  };

  return {
    filters,
    handleChangeFilter,
    handleFilterDate,
    handleMaterialTypeChange,
    handleFiltration,
    handleSort,
    handleReset,
  };
};

export default useFilterNews;
