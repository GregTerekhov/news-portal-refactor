import { useCallback } from 'react';

import { resetFilters, selectFilters } from 'reduxStore/filterSlice';
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';

const useFilterCollector = () => {
  const filteredNews = useAppSelector(selectFilters);

  const dispatch = useAppDispatch();

  // const getFilteredNews = useCallback(() => dispatch(filterNews(filteredData)))
  const resetAllFilters = useCallback(() => dispatch(resetFilters()), [dispatch]);
  return {
    filteredNews,
    //   getFilteredNews,
    resetAllFilters,
  };
};

export default useFilterCollector;
