import { createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import type { DispatchActionType } from '../store';
import type { newsAPIState } from 'types';

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
  hasResults: 'idle',
};

export const changeHeadline = createAction<string>('newsAPI/changeHeadline');

const newsAPISlice = createSlice({
  name: 'newsAPI',
  initialState,
  reducers: {
    resetOtherRequests: (state) => {
      const { popular, categories, hasResults, searchByDate, searchByWord } = initialState;

      if (state.popular.length > 0) {
        state.popular = popular;
      }
      if (state.categories.length > 0) {
        state.categories = categories;
        state.hasResults = hasResults;
      }
      if (state.searchByDate.length > 0) {
        state.searchByDate = searchByDate;
        state.hasResults = hasResults;
      }
      if (state.searchByWord.length > 0) {
        state.searchByWord = searchByWord;
        state.hasResults = hasResults;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newsAPIOperations.fetchPopularNews.fulfilled, (state, { payload }) => {
        state.hasResults = 'full';
        state.popular = payload;
      })
      .addCase(newsAPIOperations.fetchNewsByKeyword.fulfilled, (state, { payload }) => {
        payload.length > 0 ? (state.hasResults = 'full') : (state.hasResults = 'empty');
        state.searchByWord = payload;
      })
      .addCase(newsAPIOperations.fetchAllCategories.fulfilled, (state, { payload }) => {
        state.categoriesList = payload;
      })
      .addCase(newsAPIOperations.fetchNewsByCategory.fulfilled, (state, { payload }) => {
        payload.length > 0 ? (state.hasResults = 'full') : (state.hasResults = 'empty');
        state.categories = payload;
      })
      .addCase(newsAPIOperations.fetchNewsByDate.fulfilled, (state, { payload }) => {
        payload.length > 0 ? (state.hasResults = 'full') : (state.hasResults = 'empty');
        state.searchByDate = payload;
      })
      .addCase(changeHeadline, (state, { payload }) => {
        state.headline = payload;
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
