import { useCallback } from 'react';

import { ResultsState, type PartialVotedNewsArray } from 'types';

import { useAppDispatch, useAppSelector } from './reduxHooks';
import * as filters from '../filterSlice';

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
    (state: ResultsState) => dispatch(filters.results(state)),
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
