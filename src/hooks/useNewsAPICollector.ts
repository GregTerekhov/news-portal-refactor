import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
import {
  fetchAllCategories,
  //   fetchNewsByCategory,
  //   fetchNewsByDate,
  //   fetchNewsByKeyword,
  // fetchPopularNews,
  selectAllCategories,
  selectByCategory,
  selectByDate,
  selectHasAPIError,
  selectLoading,
  selectPopular,
  selectSearchByKeyword,
} from 'reduxStore/newsAPI';
import { resetOtherRequests } from 'reduxStore/newsAPI';

const useNewsAPICollector = () => {
  const isLoadingAPIData = useAppSelector(selectLoading);
  const popularNews = useAppSelector(selectPopular);
  const newsByKeyword = useAppSelector(selectSearchByKeyword);
  const newsByCategory = useAppSelector(selectByCategory);
  const newsByDate = useAppSelector(selectByDate);
  const categoriesList = useAppSelector(selectAllCategories);
  const errorAPI = useAppSelector(selectHasAPIError);

  const dispatch = useAppDispatch();

  // const fetchPopular = dispatch(fetchPopularNews(period));
  // const fetchByKeyword = dispatch(fetchNewsByKeyword(query));
  // const fetchByDate = dispatch(fetchNewsByDate(date));
  // const fetchByCategory = dispatch(fetchNewsByCategory(section));
  const fetchCategoriesList = useCallback(() => dispatch(fetchAllCategories()), [dispatch]);
  const resetPreviousRequest = useCallback(() => dispatch(resetOtherRequests()), [dispatch]);

  return {
    isLoadingAPIData,
    popularNews,
    newsByKeyword,
    newsByCategory,
    newsByDate,
    categoriesList,
    errorAPI,
    // fetchPopular,
    //   fetchByKeyword,
    //   fetchByDate,
    //   fetchByCategory,
    fetchCategoriesList,
    resetPreviousRequest,
  };
};

export default useNewsAPICollector;
