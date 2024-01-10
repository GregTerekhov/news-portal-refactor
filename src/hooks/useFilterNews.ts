import { useState } from 'react';
import { format, isAfter, startOfToday } from 'date-fns';

import { useDB, useNewsAPI, useFiltersAction } from 'reduxStore/hooks';

import { PartialVotedNewsArray } from 'types';

import { useFiltersState, useReadSortState } from 'contexts';
import useChooseRenderingNews from './useChooseRenderingNews';
import useReadNewsContent from './useReadNewsContent';
import { ActiveLinks } from './commonTypes';

import { applyCrossFilters } from '../components/NewsFIlterManager/subcomponents/FiltersBlock/assistants';

type FilterHookProps = {
  activeLinks: ActiveLinks;
  setIsOpenCalendar?: (value: React.SetStateAction<boolean>) => void;
  setSelectedMaterialType?: ((item: string) => void) | undefined;
};

const useFilterNews = ({
  activeLinks,
  setIsOpenCalendar,
  setSelectedMaterialType,
}: FilterHookProps) => {
  const [beginDate, setBeginDate] = useState<Date | null>(null);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const { filters, setFilters } = useFiltersState();
  const { sortedDates, setSortedDates } = useReadSortState();
  const { showResultsState, getFilteredNews, resetAllFilters } = useFiltersAction();
  const { updateHeadline } = useNewsAPI();
  const { allFavourites, allReads } = useDB();
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  const today = startOfToday();
  const sorDat = useReadNewsContent({ activeLinks });

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
      if (!beginDate) {
        setBeginDate(date);
      } else {
        try {
          let newSelectedDate: { beginDate: string | null; endDate: string | null };
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
          if (newSelectedDate.beginDate && newSelectedDate.endDate) {
            setFilters({
              ...filters,
              selectedFilterDate: {
                startDate: newSelectedDate.beginDate,
                endDate: newSelectedDate.endDate,
              },
            });
            setBeginDate(null);
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

  const handleSortRead = async (order: string) => {
    if (sorDat) {
      if (order === 'asc') {
        const sortedDates = Array.from(sorDat).sort().reverse();
        setSortedDates(sortedDates);
        setIsSorted(true);
      } else if (order === 'desc') {
        const sortedDates = Array.from(sorDat).sort();
        setSortedDates(sortedDates);
        setIsSorted(true);
      }
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
    setSelectedMaterialType && setSelectedMaterialType('');
    resetAllFilters();

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
