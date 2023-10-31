import { SerializedError, createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCategories,
  fetchNewsByCategory,
  fetchNewsByKeyword,
  fetchPopularNews,
  fetchNewsByDate,
} from './newsAPIOperations';
import { ArticleNewsArray, NewsWireArray, PopularNewsArray, C } from 'types';

type newsAPIState = {
  popular: PopularNewsArray;
  searchResults: ArticleNewsArray;
  categories: NewsWireArray;
  categoriesList: C[];
  isLoading: boolean;
  hasError: SerializedError | null;
};

const initialState = {
  popular: [],
  searchResults: [],
  categories: [],
  categoriesList: [],
  isLoading: false,
  hasError: null,
} as newsAPIState;

const newsAPISlice = createSlice({
  name: 'newsAPI',
  initialState,
  reducers: {},
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
        state.searchResults = action.payload;
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
        state.searchResults = action.payload;
        state.hasError = null;
      })
      .addCase(fetchNewsByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      });
  },
});

export default newsAPISlice.reducer;
