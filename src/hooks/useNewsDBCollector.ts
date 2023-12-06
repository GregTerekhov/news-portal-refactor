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
  fetchHistoryLog,
  selectAllArchives,
  selectAllFavourites,
  selectAllReads,
  selectHasDBError,
  selectLoading,
  selectSavedNews,
  selectHistoryLog,
  removeFromFavourites,
} from 'reduxStore/newsDatabase';

import { PartialVotedNewsArray, VotedItem } from 'types';

const useNewsDBCollector = () => {
  const isLoadingDBData = useAppSelector(selectLoading);
  const savedNews = useAppSelector(selectSavedNews);
  const allFavourites = useAppSelector(selectAllFavourites);
  const allReads = useAppSelector(selectAllReads);
  const allArchive = useAppSelector(selectAllArchives);
  const archiveHistoryLog = useAppSelector(selectHistoryLog);
  const errorDB = useAppSelector(selectHasDBError);

  const dispatch = useAppDispatch();

  const getSavedNews = useCallback(() => dispatch(fetchAllNews()), [dispatch]);
  const getFavourites = useCallback(() => dispatch(fetchFavourites()), [dispatch]);
  const getReads = useCallback(() => dispatch(fetchRead()), [dispatch]);
  const getArchives = useCallback(() => dispatch(fetchArchivedNews()), [dispatch]);
  const getHistoryLog = useCallback(() => dispatch(fetchHistoryLog()), [dispatch]);
  const updateSavedNews = useCallback(
    (updatedNewsObject: Partial<VotedItem>) => dispatch(addOrUpdateVotedNews(updatedNewsObject)),
    [dispatch],
  );
  const removeFavouriteNews = useCallback(
    (newsUrl: string) => dispatch(removeFromFavourites(newsUrl)),
    [dispatch],
  );
  const addVotedNews = useCallback(
    (updatedNews: PartialVotedNewsArray) => dispatch(addNews(updatedNews)),
    [dispatch],
  );
  const removeNews = useCallback((id: string) => dispatch(deleteNews(id)), [dispatch]);

  return {
    isLoadingDBData,
    savedNews,
    allFavourites,
    allReads,
    allArchive,
    archiveHistoryLog,
    errorDB,
    getSavedNews,
    getFavourites,
    getReads,
    getArchives,
    getHistoryLog,
    updateSavedNews,
    addVotedNews,
    removeNews,
    removeFavouriteNews,
  };
};

export default useNewsDBCollector;
