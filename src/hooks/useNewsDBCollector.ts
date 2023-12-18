import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
import * as newsDB from 'reduxStore/newsDatabase';

import { PartialVotedNewsArray, VotedItem } from 'types';

const useNewsDBCollector = () => {
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
