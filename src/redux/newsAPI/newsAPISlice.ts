import {
  PayloadAction,
  SerializedError,
  createAction,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';

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
  headline: string;
};

const initialState: newsAPIState = {
  popular: [],
  searchByWord: [],
  categories: [],
  categoriesList: [],
  searchByDate: [],
  isLoading: false,
  hasError: null,
  headline: 'Today`s Hot News',
};

const handlePending = (state: newsAPIState) => {
  state.isLoading = true;
  state.hasError = null;
};

const handleFulfilled = (state: newsAPIState) => {
  state.isLoading = false;
  state.hasError = null;
};

const handleRejected = (state: newsAPIState, action: PayloadAction<unknown, string, any>) => {
  state.isLoading = false;
  state.hasError = action.payload ?? null;
};

const extraActions = [
  fetchAllCategories,
  fetchNewsByCategory,
  fetchNewsByKeyword,
  fetchPopularNews,
  fetchNewsByDate,
];

const getActions = (type: 'pending' | 'fulfilled' | 'rejected') =>
  extraActions.map((action) => action[type]);

export const changeHeadline = createAction<string>('newsAPI/changeHeadline');

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
      .addCase(fetchPopularNews.fulfilled, (state, action) => {
        state.popular = action.payload;
      })
      .addCase(fetchNewsByKeyword.fulfilled, (state, action) => {
        state.searchByWord = action.payload;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categoriesList = action.payload;
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchNewsByDate.fulfilled, (state, action) => {
        state.searchByDate = action.payload;
      })
      .addCase(changeHeadline, (state, action) => {
        state.headline = action.payload;
      })
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected);
  },
});
export const { resetOtherRequests } = newsAPISlice.actions;
export const newsAPIReducer = newsAPISlice.reducer;
