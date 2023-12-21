import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import * as filters from '../filterSlice';

import { PartialVotedNewsArray } from 'types';

const useFilterCollector = () => {
  const filteredNews = useAppSelector(filters.selectFilters);
  const hasResults = useAppSelector(filters.selectResults);

  const dispatch = useAppDispatch();

  const getFilteredNews = useCallback(
    (filteredData: PartialVotedNewsArray) => dispatch(filters.filterNews(filteredData)),
    [dispatch],
  );
  const showResultsState = useCallback(
    (state: filters.FilterResults) => dispatch(filters.results(state)),
    [dispatch],
  );
  const resetAllFilters = useCallback(() => dispatch(filters.resetFilters()), [dispatch]);
  return {
    filteredNews,
    hasResults,
    getFilteredNews,
    resetAllFilters,
    showResultsState,
  };
};

export default useFilterCollector;
