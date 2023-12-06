import {
  PayloadAction,
  SerializedError,
  createAction,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';

import { IHistoryLog, PartialVotedNewsArray, VotedItem } from 'types';

import {
  deleteNews,
  fetchAllNews,
  fetchArchivedNews,
  fetchFavourites,
  fetchHistoryLog,
  fetchRead,
} from './newsDatabaseOperations';

interface NewsDBState {
  savedNews: PartialVotedNewsArray;
  favourites: PartialVotedNewsArray;
  reads: PartialVotedNewsArray;
  archivedNews: PartialVotedNewsArray;
  historyLog: IHistoryLog[];
  isLoading: boolean;
  hasError: SerializedError | null;
}

const initialState: NewsDBState = {
  savedNews: [],
  favourites: [],
  reads: [],
  archivedNews: [],
  historyLog: [],
  isLoading: false,
  hasError: null,
};

const handlePending = (state: NewsDBState) => {
  state.isLoading = true;
  state.hasError = null;
};

const handleFulfilled = (state: NewsDBState) => {
  state.isLoading = false;
  state.hasError = null;
};

const handleRejected = (state: NewsDBState, action: PayloadAction<unknown, string, any>) => {
  state.isLoading = false;
  state.hasError = action.payload ?? null;
};

const extraActions = [
  fetchAllNews,
  fetchFavourites,
  fetchRead,
  fetchArchivedNews,
  deleteNews,
  fetchHistoryLog,
];

const getActions = (type: 'pending' | 'fulfilled' | 'rejected') =>
  extraActions.map((action) => action[type]);

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
    clearVotedNews: (state) => {
      state.savedNews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.savedNews = action.payload;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.favourites = action.payload;
      })
      .addCase(fetchRead.fulfilled, (state, action) => {
        state.reads = action.payload;
      })
      .addCase(fetchArchivedNews.fulfilled, (state, action) => {
        state.archivedNews = action.payload;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        const { _id: id } = action.payload;
        state.archivedNews = state.archivedNews.filter((news) => news._id !== id);
      })
      .addCase(fetchHistoryLog.fulfilled, (state, action) => {
        state.historyLog = action.payload;
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

export const { addOrUpdateVotedNews, clearVotedNews } = newsDBSlice.actions;
export const newsDBReducer = newsDBSlice.reducer;
