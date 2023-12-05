import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
import {
  fetchAllCategories,
  fetchNewsByCategory,
  fetchNewsByDate,
  fetchNewsByKeyword,
  fetchPopularNews,
  selectAllCategories,
  selectByCategory,
  selectByDate,
  selectHasAPIError,
  selectLoading,
  selectPopular,
  selectSearchByKeyword,
  selectHeadline,
} from 'reduxStore/newsAPI';
import { resetOtherRequests, changeHeadline } from 'reduxStore/newsAPI';

import { SelectedDate } from './useAdditionalRequest';

const useNewsAPICollector = () => {
  const isLoadingAPIData = useAppSelector(selectLoading);
  const popularNews = useAppSelector(selectPopular);
  const newsByKeyword = useAppSelector(selectSearchByKeyword);
  const newsByCategory = useAppSelector(selectByCategory);
  const newsByDate = useAppSelector(selectByDate);
  const categoriesList = useAppSelector(selectAllCategories);
  const headline = useAppSelector(selectHeadline);
  const errorAPI = useAppSelector(selectHasAPIError);

  const dispatch = useAppDispatch();

  const fetchPopular = useCallback(
    (period: string) => dispatch(fetchPopularNews(period)),
    [dispatch],
  );
  const fetchByKeyword = useCallback(
    (query: string) => dispatch(fetchNewsByKeyword(query)),
    [dispatch],
  );
  const fetchByDate = useCallback(
    (date: SelectedDate) => dispatch(fetchNewsByDate(date)),
    [dispatch],
  );
  const fetchByCategory = useCallback(
    (section: string) => dispatch(fetchNewsByCategory(section)),
    [dispatch],
  );
  const fetchCategoriesList = useCallback(() => dispatch(fetchAllCategories()), [dispatch]);
  const resetPreviousRequest = useCallback(() => dispatch(resetOtherRequests()), [dispatch]);
  const updateHeadline = useCallback(
    (newHeadline: string) => dispatch(changeHeadline(newHeadline)),
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
