import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import * as filters from '../filterSlice';

import type { FilterResults, PartialVotedNewsArray } from 'types';

const useFilterCollector = () => {
  const filteredNews = useAppSelector(filters.selectFilters);
  const hasResults = useAppSelector(filters.selectResults);
  const isSorted = useAppSelector(filters.selectIsSorted);

  const dispatch = useAppDispatch();

  const getFilteredNews = useCallback(
    (filteredData: PartialVotedNewsArray) => dispatch(filters.filterNews(filteredData)),
    [dispatch],
  );
  const showResultsState = useCallback(
    (state: FilterResults) => dispatch(filters.results(state)),
    [dispatch],
  );
  const setIsSorted = useCallback(
    (state: boolean) => dispatch(filters.changeSortState(state)),
    [dispatch],
  );
  const resetAllFiltersResults = useCallback(() => dispatch(filters.resetFilters()), [dispatch]);

  return {
    isSorted,
    filteredNews,
    hasResults,
    getFilteredNews,
    resetAllFiltersResults,
    showResultsState,
    setIsSorted,
  };
};

export default useFilterCollector;
