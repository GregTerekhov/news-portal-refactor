import { useCallback } from 'react';

import { filterNews, resetFilters, selectFilters } from 'reduxStore/filterSlice';
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
import { PartialVotedNewsArray } from 'types/news';

const useFilterCollector = () => {
  const filteredNews = useAppSelector(selectFilters);

  const dispatch = useAppDispatch();

  const getFilteredNews = useCallback(
    (filteredData: PartialVotedNewsArray) => dispatch(filterNews(filteredData)),
    [dispatch],
  );
  const resetAllFilters = useCallback(() => dispatch(resetFilters()), [dispatch]);
  return {
    filteredNews,
    getFilteredNews,
    resetAllFilters,
  };
};

export default useFilterCollector;
