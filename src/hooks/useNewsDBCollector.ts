import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
import {
  addNews,
  addOrUpdateVotedNews,
  deleteNews,
  fetchAllNews,
  fetchArchivedNews,
  fetchFavourites,
  fetchRead,
  selectAllArchives,
  selectAllFavourites,
  selectAllReads,
  selectHasDBError,
  selectLoading,
  selectSavedNews,
} from 'reduxStore/newsDatabase';

import { PartialVotedNewsArray, VotedItem } from 'types';

const useNewsDBCollector = () => {
  const isLoadingDBData = useAppSelector(selectLoading);
  const savedNews = useAppSelector(selectSavedNews);
  const allFavourites = useAppSelector(selectAllFavourites);
  const allReads = useAppSelector(selectAllReads);
  const allArchive = useAppSelector(selectAllArchives);
  const errorDB = useAppSelector(selectHasDBError);

  const dispatch = useAppDispatch();

  const getSavedNews = useCallback(() => dispatch(fetchAllNews()), [dispatch]);
  const getFavourites = useCallback(() => dispatch(fetchFavourites()), [dispatch]);
  const getReads = useCallback(() => dispatch(fetchRead()), [dispatch]);
  const getArchives = useCallback(() => dispatch(fetchArchivedNews()), [dispatch]);
  const updateSavedNews = useCallback(
    (updatedNewsObject: Partial<VotedItem>) => dispatch(addOrUpdateVotedNews(updatedNewsObject)),
    [dispatch],
  );
  const addVotedNews = useCallback(
    (updatedNews: PartialVotedNewsArray) => dispatch(addNews(updatedNews)),
    [dispatch],
  );
  const removeNews = useCallback((newsUrl: string) => dispatch(deleteNews(newsUrl)), [dispatch]);

  return {
    isLoadingDBData,
    savedNews,
    allFavourites,
    allReads,
    allArchive,
    errorDB,
    getSavedNews,
    getFavourites,
    getReads,
    getArchives,
    updateSavedNews,
    addVotedNews,
    removeNews,
  };
};

export default useNewsDBCollector;
