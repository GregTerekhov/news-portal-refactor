// import { useCallback } from "react";
import { useCallback } from 'react';
import { resetFilters, selectFilters } from 'redux/filterSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

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
