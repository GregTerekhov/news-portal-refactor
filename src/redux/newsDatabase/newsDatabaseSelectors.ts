import type { RootState } from '../store';

export const selectSuccessMessage = (state: RootState) => state.newsDB.message;
export const selectSavedNews = (state: RootState) => state.newsDB.savedNews;
export const selectAllFavourites = (state: RootState) => state.newsDB.favourites;
export const selectAllReads = (state: RootState) => state.newsDB.reads;
export const selectAllArchives = (state: RootState) => state.newsDB.archivedNews;
export const selectLoading = (state: RootState) => state.newsDB.isLoading;
export const selectHasDBError = (state: RootState) => state.newsDB.hasError;
export const selectHistoryLog = (state: RootState) => state.newsDB.historyLog;
export const selectRequestStatus = (state: RootState) => state.newsDB.status;
