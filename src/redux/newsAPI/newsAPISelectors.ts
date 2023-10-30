import type { RootState } from 'redux/store';

export const selectLoading = (state: RootState) => state.newsAPI.isLoading;
export const selectPopular = (state: RootState) => state.newsAPI.popular;
export const selectSearchByKeyword = (state: RootState) => state.newsAPI.searchResults;
export const selectByCategory = (state: RootState) => state.newsAPI.categories;
export const selectHasError = (state: RootState) => state.newsAPI.hasError;
export const selectAllCategories = (state: RootState) => state.newsAPI.categoriesList;
