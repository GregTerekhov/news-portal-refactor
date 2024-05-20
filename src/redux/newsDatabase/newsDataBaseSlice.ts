import { PayloadAction, createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  DispatchActionType,
  OperationName,
  RequestStatus,
  SliceName,
  type NewsDBState,
  type VotedItem,
} from 'types';

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
  status: RequestStatus.Undefined,
};

export const removeFromFavourites = createAction<string>(OperationName.RemoveFavourite);

const newsDBSlice = createSlice({
  name: SliceName.DB,
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
      .addCase(newsDBOperations.deleteNews.fulfilled, (state, { payload, meta }) => {
        const { _id: id } = payload;
        const { requestStatus } = meta;

        state.archivedNews = state.archivedNews.filter((news) => news._id !== id);
        state.status = requestStatus as RequestStatus;
      })
      .addCase(newsDBOperations.fetchHistoryLog.fulfilled, (state, { payload }) => {
        state.historyLog = payload.data;
      })
      .addCase(newsDBOperations.clearHistoryLog.fulfilled, (state, { meta }) => {
        const { requestStatus } = meta;

        state.historyLog = [];
        state.status = requestStatus as RequestStatus;
      })
      .addCase(removeFromFavourites, (state, { payload }) => {
        const newsUrl = payload;
        if (newsUrl !== '') {
          state.favourites = state.favourites.filter((fav) => fav.newsUrl !== newsUrl);
        }
      })
      .addMatcher(isAnyOf(...getActions(DispatchActionType.Pending)), handlePending)
      .addMatcher(isAnyOf(...getActions(DispatchActionType.Fulfilled)), handleFulfilled)
      .addMatcher(isAnyOf(...getActions(DispatchActionType.Rejected)), handleRejected);
  },
});

export const { addOrUpdateVotedNews } = newsDBSlice.actions;
export const newsDBReducer = newsDBSlice.reducer;
