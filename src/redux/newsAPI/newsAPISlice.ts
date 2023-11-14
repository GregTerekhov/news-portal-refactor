import { SerializedError, createSlice } from '@reduxjs/toolkit';

import { ArticleNewsArray, NewsWireArray, PopularNewsArray, C } from 'types';

import {
  fetchAllCategories,
  fetchNewsByCategory,
  fetchNewsByKeyword,
  fetchPopularNews,
  fetchNewsByDate,
} from './newsAPIOperations';

type newsAPIState = {
  popular: PopularNewsArray;
  searchByWord: ArticleNewsArray;
  categories: NewsWireArray;
  categoriesList: C[];
  searchByDate: ArticleNewsArray;
  isLoading: boolean;
  hasError: SerializedError | null;
};

const initialState = {
  popular: [],
  searchByWord: [],
  categories: [],
  categoriesList: [],
  searchByDate: [],
  isLoading: false,
  hasError: null,
} as newsAPIState;

const newsAPISlice = createSlice({
  name: 'newsAPI',
  initialState,
  reducers: {
    resetOtherRequests: (state) => {
      if (state.popular.length > 0) {
        state.popular = initialState.popular;
      }
      if (state.categories.length > 0) {
        state.categories = initialState.categories;
      }
      if (state.searchByDate.length > 0) {
        state.searchByDate = initialState.searchByDate;
      }
      if (state.searchByWord.length > 0) {
        state.searchByWord = initialState.searchByWord;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularNews.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchPopularNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popular = action.payload;
        state.hasError = null;
      })
      .addCase(fetchPopularNews.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(fetchNewsByKeyword.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchNewsByKeyword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchByWord = action.payload;
        state.hasError = null;
      })
      .addCase(fetchNewsByKeyword.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoriesList = action.payload;
        state.hasError = null;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(fetchNewsByCategory.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.hasError = null;
      })
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(fetchNewsByDate.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchNewsByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchByDate = action.payload;
        state.hasError = null;
      })
      .addCase(fetchNewsByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      });
  },
});
export const { resetOtherRequests } = newsAPISlice.actions;
export const newsAPIReducer = newsAPISlice.reducer;
