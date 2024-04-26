import { useCallback } from 'react';

import type { PartialVotedNewsArray, VotedItem } from 'types';
import { useAppDispatch, useAppSelector } from '../hooks';
import * as newsDB from '../newsDatabase';

const useNewsDBCollector = () => {
  const dbSuccessMessage = useAppSelector(newsDB.selectSuccessMessage);
  const isLoadingDBData = useAppSelector(newsDB.selectLoading);
  const savedNews = useAppSelector(newsDB.selectSavedNews);
  const allFavourites = useAppSelector(newsDB.selectAllFavourites);
  const allReads = useAppSelector(newsDB.selectAllReads);
  const allArchive = useAppSelector(newsDB.selectAllArchives);
  const archiveHistoryLog = useAppSelector(newsDB.selectHistoryLog);
  const errorDB = useAppSelector(newsDB.selectHasDBError);

  const dispatch = useAppDispatch();

  const getSavedNews = useCallback(() => dispatch(newsDB.fetchAllNews()), [dispatch]);
  const getFavourites = useCallback(() => dispatch(newsDB.fetchFavourites()), [dispatch]);
  const getReads = useCallback(() => dispatch(newsDB.fetchRead()), [dispatch]);
  const getArchives = useCallback(() => dispatch(newsDB.fetchArchivedNews()), [dispatch]);
  const getHistoryLog = useCallback(() => dispatch(newsDB.fetchHistoryLog()), [dispatch]);
  const updateSavedNews = useCallback(
    (updatedNewsObject: Partial<VotedItem>) =>
      dispatch(newsDB.addOrUpdateVotedNews(updatedNewsObject)),
    [dispatch],
  );
  const removeFavouriteNews = useCallback(
    (newsUrl: string) => dispatch(newsDB.removeFromFavourites(newsUrl)),
    [dispatch],
  );
  const addVotedNews = useCallback(
    (updatedNews: PartialVotedNewsArray) => dispatch(newsDB.addNews(updatedNews)),
    [dispatch],
  );
  const removeNews = useCallback((id: string) => dispatch(newsDB.deleteNews(id)), [dispatch]);
  const clearLog = useCallback(() => dispatch(newsDB.clearHistoryLog()), [dispatch]);

  return {
    dbSuccessMessage,
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
    clearLog,
  };
};

export default useNewsDBCollector;
