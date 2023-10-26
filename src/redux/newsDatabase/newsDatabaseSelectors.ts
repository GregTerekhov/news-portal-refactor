import type { RootState } from 'redux/store';

export const selectAllNews = (state: RootState) => state.newsDB.allSelectedNews;
export const selectAllFavourites = (state: RootState) => state.newsDB.favourites;
export const selectAllReads = (state: RootState) => state.newsDB.reads;
export const selectLoading = (state: RootState) => state.newsDB.isLoading;
export const selectHasError = (state: RootState) => state.newsDB.hasError;
