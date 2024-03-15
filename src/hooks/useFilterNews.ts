import { useState } from 'react';
import { isAfter, startOfToday } from 'date-fns';

import { useDB, useNewsAPI, useFiltersAction } from 'reduxStore/hooks';

import { PartialVotedNewsArray } from 'types';

import { useFiltersState, useReadSortState, useSelectedDate } from 'contexts';
import useChooseRenderingNews from './useChooseRenderingNews';
import useReadNewsContent from './useReadNewsContent';
import { ActiveLinks } from './commonTypes';

import { applyCrossFilters, determineNewSelectedDate, formatSortedDate } from 'helpers';

const useFilterNews = (activeLinks: ActiveLinks) => {
  const [beginDate, setBeginDate] = useState<Date | null>(null);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const { filters, setFilters, setSelectedMaterialType } = useFiltersState();
  const { sortedDates, setSortedDates } = useReadSortState();

  const { showResultsState, getFilteredNews, resetAllFilters } = useFiltersAction();
  const { updateHeadline } = useNewsAPI();
  const { allFavourites, allReads } = useDB();

  const { rebuildedNews } = useChooseRenderingNews(activeLinks);
  const sortedAccordionDates = useReadNewsContent(activeLinks);
  const { setSelectedFilterDate } = useSelectedDate();

  const today = startOfToday();

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleMaterialTypeChange = (selectedType: string): void => {
    setFilters({
      ...filters,
      materialType: selectedType,
    });
  };

  const handleFilterDate = (date: Date): void => {
    if (!isAfter(date, today)) {
      if (!beginDate) {
        setBeginDate(date);
      } else {
        try {
          const newSelectedDate = determineNewSelectedDate(date, beginDate, 'filter');
          setSelectedFilterDate(newSelectedDate);

          if (newSelectedDate.beginDate && newSelectedDate.endDate) {
            console.log(newSelectedDate);
            setFilters({
              ...filters,
              selectedFilterDate: {
                startDate: newSelectedDate.beginDate,
                endDate: newSelectedDate.endDate,
              },
            });
            setBeginDate(null);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleFiltration = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    if (isSorted) {
      alert(`YOU CAN'T FILTERING AFTER SORTING. RESET THE SETTINGS AND TRY AGAIN`);
    }

    showResultsState('loading');

    if (activeLinks.isHomeActive) {
      updateHeadline('Filtered News');
    }

    if (filters) {
      const hasFilterValue = Object.values(filters).some((entry) => entry !== '');

      if (
        rebuildedNews &&
        typeof rebuildedNews !== undefined &&
        rebuildedNews.length > 0 &&
        hasFilterValue
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
    }
    setIsSorted(false);
  };

  const handleSort = (order: string): void => {
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
        const dateA = formatSortedDate(a.publishDate);
        const dateB = formatSortedDate(b.publishDate);

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

  const handleSortRead = async (order: string): Promise<void> => {
    if (sortedAccordionDates) {
      if (order === 'asc') {
        const sortedDates = Array.from(sortedAccordionDates).sort().reverse();
        setSortedDates(sortedDates);
        setIsSorted(true);
      } else if (order === 'desc') {
        const sortedDates = Array.from(sortedAccordionDates).sort();
        setSortedDates(sortedDates);
        setIsSorted(true);
      }
    }
  };

  const handleReset = async (): Promise<void> => {
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
    setSelectedFilterDate({
      beginDate: null,
      endDate: null,
    });

    setSortedDates([]);
    setIsSorted(false);
  };

  return {
    handleChangeFilter,
    handleFilterDate,
    handleMaterialTypeChange,
    handleFiltration,
    handleSort,
    handleReset,
    handleSortRead,
    sortedDates,
  };
};

export default useFilterNews;
