import { PayloadAction, createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { NewsDBState, VotedItem } from 'types';

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
      const updatedVotedNews = action.payload;
      const existingNewsIndex = state.savedNews.findIndex(
        (news) => news.newsUrl === updatedVotedNews.newsUrl,
      );
      if (existingNewsIndex !== -1) {
        state.savedNews[existingNewsIndex] = {
          ...state.savedNews[existingNewsIndex],
          isFavourite: updatedVotedNews.isFavourite,
          hasRead: updatedVotedNews.hasRead,
          additionDate: updatedVotedNews.additionDate,
        };
      } else {
        state.savedNews.unshift(updatedVotedNews);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newsDBOperations.fetchAllNews.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.savedNews = action.payload.data;
      })
      .addCase(newsDBOperations.fetchFavourites.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.favourites = action.payload.data;
      })
      .addCase(newsDBOperations.fetchRead.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.reads = action.payload.data;
      })
      .addCase(newsDBOperations.fetchArchivedNews.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.archivedNews = action.payload.data;
      })
      .addCase(newsDBOperations.deleteNews.fulfilled, (state, action) => {
        state.message = action.payload.message;
        const { _id: id } = action.payload;
        state.archivedNews = state.archivedNews.filter((news) => news._id !== id);
      })
      .addCase(newsDBOperations.fetchHistoryLog.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.historyLog = action.payload.data;
      })
      .addCase(removeFromFavourites, (state, action) => {
        const newsUrl = action.payload;
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
