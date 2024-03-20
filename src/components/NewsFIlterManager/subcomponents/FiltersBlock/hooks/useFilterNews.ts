import { useState } from 'react';

import { useDB, useNewsAPI, useFiltersAction } from 'reduxStore/hooks';
import { useFiltersState, usePaginationContext, useReadSortState, useSelectedDate } from 'contexts';

import type { PartialVotedNewsArray } from 'types';

import { useActiveLinks, useChooseRenderingNews, useReadNewsContent } from 'hooks';
import { applyCrossFilters, formatSortedDate } from 'helpers';

const useFilterNews = () => {
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const { showResultsState, getFilteredNews, resetAllFiltersResults } = useFiltersAction();
  const { updateHeadline } = useNewsAPI();
  const { allFavourites, allReads } = useDB();

  const { filters, setSelectedMaterialType, resetFilters } = useFiltersState();
  const { setSortedDates } = useReadSortState();
  const { resetFiltersDay } = useSelectedDate();
  const { resetPagination } = usePaginationContext();

  const activeLinks = useActiveLinks();
  const sortedAccordionDates = useReadNewsContent();

  const { rebuildedNews } = useChooseRenderingNews(activeLinks);

  const { isHomeActive, isFavoriteActive, isReadActive } = activeLinks;

  const handleFiltration = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    if (isSorted) {
      alert(`YOU CAN'T FILTERING AFTER SORTING. RESET THE SETTINGS AND TRY AGAIN`);
    }

    showResultsState('loading');

    if (isHomeActive) {
      updateHeadline('Filtered News');
      resetPagination();
    }

    if (!filters || !rebuildedNews || rebuildedNews?.length === 0) return;

    const hasFilterValue = Object.values(filters).some((entry) => entry !== '');
    if (!hasFilterValue) return;

    let filteredNews: PartialVotedNewsArray = [];

    if (isHomeActive) {
      filteredNews = applyCrossFilters(rebuildedNews, filters);
    } else if (isFavoriteActive) {
      filteredNews = applyCrossFilters(allFavourites, filters);
    } else if (isReadActive) {
      filteredNews = applyCrossFilters(allReads, filters);
    }

    if (filteredNews && filteredNews.length > 0) {
      getFilteredNews(filteredNews);
      showResultsState('full');
    } else {
      showResultsState('empty');
    }
    setIsSorted(false);
  };

  const handleSort = (order: string): void => {
    if (!rebuildedNews || rebuildedNews.length === 0) return;
    let sortedNews: PartialVotedNewsArray = [];

    if (isHomeActive) {
      sortedNews = [...rebuildedNews];
    } else if (isFavoriteActive) {
      sortedNews = [...allFavourites];
    } else if (isReadActive) {
      sortedNews = [...allReads];
    }

    sortedNews.sort((a, b) => {
      const dateA = formatSortedDate(a.publishDate);
      const dateB = formatSortedDate(b.publishDate);

      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

    getFilteredNews(sortedNews);
  };

  const handleSortRead = async (order: string): Promise<void> => {
    if (!sortedAccordionDates) return;

    const sortedDates =
      order === 'asc'
        ? Array.from(sortedAccordionDates).sort().reverse()
        : Array.from(sortedAccordionDates).sort();

    setSortedDates(sortedDates);
    setIsSorted(true);
  };

  const handleReset = async (): Promise<void> => {
    if (isHomeActive) {
      updateHeadline("Today's Hot News");
      resetPagination();
    }

    resetFilters();
    setSelectedMaterialType('');
    resetAllFiltersResults();
    resetFiltersDay();
    setSortedDates([]);
    setIsSorted(false);
  };

  return {
    handleFiltration,
    handleSort,
    handleReset,
    handleSortRead,
  };
};

export default useFilterNews;
