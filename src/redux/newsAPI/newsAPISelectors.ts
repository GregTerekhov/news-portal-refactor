import type { RootState } from 'reduxStore/store';

export const selectLoading = (state: RootState) => state.newsAPI.isLoading;
export const selectPopular = (state: RootState) => state.newsAPI.popular;
export const selectSearchByKeyword = (state: RootState) => state.newsAPI.searchByWord;
export const selectByCategory = (state: RootState) => state.newsAPI.categories;
export const selectByDate = (state: RootState) => state.newsAPI.searchByDate;
export const selectHasAPIError = (state: RootState) => state.newsAPI.hasError;
export const selectAllCategories = (state: RootState) => state.newsAPI.categoriesList;
export const selectHeadline = (state: RootState) => state.newsAPI.headline;
