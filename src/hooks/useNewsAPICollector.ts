import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
import * as newsAPI from 'reduxStore/newsAPI';

import { SelectedDate } from './useAdditionalRequest';

const useNewsAPICollector = () => {
  const isLoadingAPIData = useAppSelector(newsAPI.selectLoading);
  const popularNews = useAppSelector(newsAPI.selectPopular);
  const newsByKeyword = useAppSelector(newsAPI.selectSearchByKeyword);
  const newsByCategory = useAppSelector(newsAPI.selectByCategory);
  const newsByDate = useAppSelector(newsAPI.selectByDate);
  const categoriesList = useAppSelector(newsAPI.selectAllCategories);
  const headline = useAppSelector(newsAPI.selectHeadline);
  const errorAPI = useAppSelector(newsAPI.selectHasAPIError);

  const dispatch = useAppDispatch();

  const fetchPopular = useCallback(
    (period: string) => dispatch(newsAPI.fetchPopularNews(period)),
    [dispatch],
  );
  const fetchByKeyword = useCallback(
    (query: string) => dispatch(newsAPI.fetchNewsByKeyword(query)),
    [dispatch],
  );
  const fetchByDate = useCallback(
    (date: SelectedDate) => dispatch(newsAPI.fetchNewsByDate(date)),
    [dispatch],
  );
  const fetchByCategory = useCallback(
    (section: string) => dispatch(newsAPI.fetchNewsByCategory(section)),
    [dispatch],
  );
  const fetchCategoriesList = useCallback(() => dispatch(newsAPI.fetchAllCategories()), [dispatch]);
  const resetPreviousRequest = useCallback(
    () => dispatch(newsAPI.resetOtherRequests()),
    [dispatch],
  );
  const updateHeadline = useCallback(
    (newHeadline: string) => dispatch(newsAPI.changeHeadline(newHeadline)),
    [dispatch],
  );

  return {
    isLoadingAPIData,
    popularNews,
    newsByKeyword,
    newsByCategory,
    newsByDate,
    categoriesList,
    errorAPI,
    headline,
    fetchPopular,
    fetchByKeyword,
    fetchByDate,
    fetchByCategory,
    fetchCategoriesList,
    resetPreviousRequest,
    updateHeadline,
  };
};

export default useNewsAPICollector;
