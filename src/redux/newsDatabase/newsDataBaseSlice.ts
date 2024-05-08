import { PayloadAction, createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import type { NewsDBState, VotedItem } from 'types';

import * as newsDBOperations from './newsDatabaseOperations';
import { getActions, handleFulfilled, handlePending, handleRejected } from './handleFunctions';

const initialState: NewsDBState = {
  message: '',
  savedNews: [],
  favourites: [],
  reads: [],
  archivedNews: [],
  historyLog: [],
  isLoading: false,
  hasError: null,
};

export const removeFromFavourites = createAction<string>('newsDB/removeFromFavourites');

const newsDBSlice = createSlice({
  name: 'newsDB',
  initialState,
  reducers: {
    addOrUpdateVotedNews: (state, action: PayloadAction<Partial<VotedItem>>) => {
      const { newsUrl, isFavourite, hasRead, additionDate } = action.payload;

      const existingNewsIndex = state.savedNews.findIndex((news) => news.newsUrl === newsUrl);
      if (existingNewsIndex !== -1) {
        state.savedNews[existingNewsIndex] = {
          ...state.savedNews[existingNewsIndex],
          isFavourite: isFavourite,
          hasRead: hasRead,
          additionDate: additionDate,
        };
      } else {
        state.savedNews.unshift(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newsDBOperations.fetchAllNews.fulfilled, (state, { payload }) => {
        state.savedNews = payload.data;
      })
      .addCase(newsDBOperations.fetchFavourites.fulfilled, (state, { payload }) => {
        state.favourites = payload.data;
      })
      .addCase(newsDBOperations.fetchRead.fulfilled, (state, { payload }) => {
        state.reads = payload.data;
      })
      .addCase(newsDBOperations.fetchArchivedNews.fulfilled, (state, { payload }) => {
        state.archivedNews = payload.data;
      })
      .addCase(newsDBOperations.deleteNews.fulfilled, (state, { payload }) => {
        const { _id: id } = payload;
        state.archivedNews = state.archivedNews.filter((news) => news._id !== id);
      })
      .addCase(newsDBOperations.fetchHistoryLog.fulfilled, (state, { payload }) => {
        state.historyLog = payload.data;
      })
      .addCase(newsDBOperations.clearHistoryLog.fulfilled, (state) => {
        state.historyLog = [];
      })
      .addCase(removeFromFavourites, (state, { payload }) => {
        const newsUrl = payload;
        if (newsUrl !== '') {
          state.favourites = state.favourites.filter((fav) => fav.newsUrl !== newsUrl);
        }
      })
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected);
  },
});

export const { addOrUpdateVotedNews } = newsDBSlice.actions;
export const newsDBReducer = newsDBSlice.reducer;
