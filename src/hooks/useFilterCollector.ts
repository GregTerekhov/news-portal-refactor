import { useCallback } from 'react';

import {
  FilterResults,
  filterNews,
  resetFilters,
  results,
  selectFilters,
  selectResults,
} from 'reduxStore/filterSlice';
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
import { PartialVotedNewsArray } from 'types/news';

const useFilterCollector = () => {
  const filteredNews = useAppSelector(selectFilters);
  const hasResults = useAppSelector(selectResults);

  const dispatch = useAppDispatch();

  const getFilteredNews = useCallback(
    (filteredData: PartialVotedNewsArray) => dispatch(filterNews(filteredData)),
    [dispatch],
  );
  const showResultsState = useCallback(
    (state: FilterResults) => dispatch(results(state)),
    [dispatch],
  );
  const resetAllFilters = useCallback(() => dispatch(resetFilters()), [dispatch]);
  return {
    filteredNews,
    hasResults,
    getFilteredNews,
    resetAllFilters,
    showResultsState,
  };
};

export default useFilterCollector;
