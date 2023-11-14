import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
import {
  //   addNews,
  fetchAllNews,
  fetchFavourites,
  fetchRead,
  selectAllFavourites,
  selectAllReads,
  selectHasDBError,
  selectLoading,
  selectSavedNews,
} from 'reduxStore/newsDatabase';
// import { addOrUpdateVotedNews } from 'reduxStore/newsDatabase/newsDataBaseSlice';

const useNewsDBCollector = () => {
  const isLoadingDBData = useAppSelector(selectLoading);
  const savedNews = useAppSelector(selectSavedNews);
  const allFavourites = useAppSelector(selectAllFavourites);
  const allReads = useAppSelector(selectAllReads);
  const errorDB = useAppSelector(selectHasDBError);

  const dispatch = useAppDispatch();

  const getSavedNews = useCallback(() => dispatch(fetchAllNews()), [dispatch]);
  const getFavourites = useCallback(() => dispatch(fetchFavourites()), [dispatch]);
  const getReads = useCallback(() => dispatch(fetchRead()), [dispatch]);
  //     const updateSavedNews = dispatch(addOrUpdateVotedNews(updatedData));
  //   const addVotedNews = dispatch(addNews(updatedData));

  return {
    isLoadingDBData,
    savedNews,
    allFavourites,
    allReads,
    errorDB,
    getSavedNews,
    getFavourites,
    getReads,
    // updateSavedNews
    // addVotedNews,
  };
};

export default useNewsDBCollector;
