import { createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import type { DispatchActionType } from 'reduxStore/store';
import { newsAPIState } from 'types';

import * as newsAPIOperations from './newsAPIOperations';
import { handleFulfilled, handlePending, handleRejected } from '../services';

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
      .addCase(newsAPIOperations.fetchPopularNews.fulfilled, (state, action) => {
        state.popular = action.payload;
      })
      .addCase(newsAPIOperations.fetchNewsByKeyword.fulfilled, (state, action) => {
        state.searchByWord = action.payload;
      })
      .addCase(newsAPIOperations.fetchAllCategories.fulfilled, (state, action) => {
        state.categoriesList = action.payload;
      })
      .addCase(newsAPIOperations.fetchNewsByCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(newsAPIOperations.fetchNewsByDate.fulfilled, (state, action) => {
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

const extraActions = [
  newsAPIOperations.fetchAllCategories,
  newsAPIOperations.fetchNewsByCategory,
  newsAPIOperations.fetchNewsByKeyword,
  newsAPIOperations.fetchPopularNews,
  newsAPIOperations.fetchNewsByDate,
];

const getActions = (type: DispatchActionType) => extraActions.map((action) => action[type]);

export const { resetOtherRequests } = newsAPISlice.actions;
export const newsAPIReducer = newsAPISlice.reducer;
