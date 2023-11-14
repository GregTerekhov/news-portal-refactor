import { useEffect, useState } from 'react';
import { format, isAfter, startOfToday } from 'date-fns';

import { filterNews } from 'reduxStore/filterSlice';
import { useAppDispatch } from 'reduxStore/hooks';

import { Filters, PartialVotedNewsArray } from 'types';

import { applyCrossFilters } from 'helpers';

import useChooseRenderingNews from './useChooseRenderingNews';
import useFilterCollector from './useFilterCollector';
import useNewsDBCollector from './useNewsDBCollector';

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
  const { resetAllFilters } = useFilterCollector();
  const { allFavourites, allReads } = useNewsDBCollector();
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  const dispatch = useAppDispatch();
  const today = startOfToday();

  useEffect(() => {
    console.log('Date changed', filters.selectedFilterDate);
  }, [filters.selectedFilterDate]);

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
    console.log('date', date);
    if (!isAfter(date, today)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        selectedFilterDate: format(date, 'dd/MM/yyyy'),
      }));
      setIsOpenCalendar ? setIsOpenCalendar(false) : null;
    }
  };

  const handleFiltration = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Selected filter date in filtration: ', filters.selectedFilterDate); // Виводимо значення дати фільтрації

    if (
      rebuildedNews &&
      typeof rebuildedNews !== undefined &&
      rebuildedNews.length > 0 &&
      filters
    ) {
      if (activeLinks.isHomeActive) {
        const filteredNews = applyCrossFilters(rebuildedNews, filters);
        console.log('filters', filters);
        if (filteredNews) {
          dispatch(filterNews(filteredNews));
        }
      } else if (activeLinks.isFavoriteActive) {
        const filteredNews = applyCrossFilters(allFavourites, filters);

        if (filteredNews) {
          dispatch(filterNews(filteredNews));
        }
      } else if (activeLinks.isReadActive) {
        const filteredNews = applyCrossFilters(allReads, filters);

        if (filteredNews) {
          dispatch(filterNews(filteredNews));
        }
      }
    } else {
      const defaultFilteredNews: PartialVotedNewsArray = [];
      dispatch(filterNews(defaultFilteredNews));
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
      dispatch(filterNews(sortedNews));
    }
  };

  const handleReset = async () => {
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
    handleChangeFilter,
    handleFilterDate,
    handleMaterialTypeChange,
    handleFiltration,
    handleSort,
    handleReset,
  };
};

export default useFilterNews;
