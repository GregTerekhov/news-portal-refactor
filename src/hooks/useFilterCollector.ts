// import { useCallback } from "react";
import { selectFilters } from 'redux/filterSlice';
import { useAppSelector } from 'redux/hooks';

const useFilterCollector = () => {
  const filteredNews = useAppSelector(selectFilters);

  // const dispatch = useAppDispatch()

  // const getFilteredNews = useCallback(() => dispatch(filterNews(filteredData)))

  return {
    filteredNews,
    //   getFilteredNews,
  };
};

export default useFilterCollector;
