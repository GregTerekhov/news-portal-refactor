import { createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  DispatchActionType,
  OperationName,
  ResultsState,
  SliceName,
  type newsAPIState,
} from 'types';

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
  hasResults: ResultsState.Idle,
};

export const changeHeadline = createAction<string>(OperationName.ChangeHeadline);

const newsAPISlice = createSlice({
  name: SliceName.APINews,
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
        state.hasResults = ResultsState.Fulfilled;
        state.popular = payload;
      })
      .addCase(newsAPIOperations.fetchNewsByKeyword.fulfilled, (state, { payload }) => {
        payload.length > 0
          ? (state.hasResults = ResultsState.Fulfilled)
          : (state.hasResults = ResultsState.Empty);
        state.searchByWord = payload;
      })
      .addCase(newsAPIOperations.fetchAllCategories.fulfilled, (state, { payload }) => {
        state.categoriesList = payload;
      })
      .addCase(newsAPIOperations.fetchNewsByCategory.fulfilled, (state, { payload }) => {
        payload.length > 0
          ? (state.hasResults = ResultsState.Fulfilled)
          : (state.hasResults = ResultsState.Empty);
        state.categories = payload;
      })
      .addCase(newsAPIOperations.fetchNewsByDate.fulfilled, (state, { payload }) => {
        payload.length > 0
          ? (state.hasResults = ResultsState.Fulfilled)
          : (state.hasResults = ResultsState.Empty);
        state.searchByDate = payload;
      })
      .addCase(changeHeadline, (state, { payload }) => {
        state.headline = payload;
      })
      .addMatcher(isAnyOf(...getActions(DispatchActionType.Pending)), handlePending)
      .addMatcher(isAnyOf(...getActions(DispatchActionType.Fulfilled)), handleFulfilled)
      .addMatcher(isAnyOf(...getActions(DispatchActionType.Rejected)), handleRejected);
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
