import type { RootState } from 'redux/store';

export const selectSavedNews = (state: RootState) => state.newsDB.savedNews;
export const selectAllFavourites = (state: RootState) => state.newsDB.favourites;
export const selectAllReads = (state: RootState) => state.newsDB.reads;
export const selectLoading = (state: RootState) => state.newsDB.isLoading;
export const selectHasDBError = (state: RootState) => state.newsDB.hasError;
