import { PayloadAction, SerializedError, createAction, createSlice } from '@reduxjs/toolkit';

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

// type FavouritesAction = PayloadAction<
//   FavouritesArray,
//   string,
//   { arg: void; requestId: string; requestStatus: 'fulfilled' },
//   never
// >;

const initialState: NewsDBState = {
  savedNews: [],
  favourites: [],
  reads: [],
  archivedNews: [],
  historyLog: [],
  isLoading: false,
  hasError: null,
};

// const handlePending = (state) => {
//   state.isLoading = true;
// };

// const handleFulfilled = (state: RootState) => {
//   state.isLoading = false;
//   state.hasError = null;
// };

// const handleRejected = (state: RootState, action: FavouritesAction) => {
//   state.isLoading = false;
//   state.hasError = action.payload;
// };

// const getActions = (type: string) => {
//   switch (type) {
//     case 'pending':
//       return [fetchFavourites.pending, addToFavourite.pending];
//     case 'fulfilled':
//       return [fetchFavourites.fulfilled, addToFavourite.fulfilled];
//     case 'rejected':
//       return [fetchFavourites.rejected, addToFavourite.rejected];
//     default:
//       return [];
//   }
// };

export const removeFromFavourites = createAction<{ newsUrl: string }>(
  'newsDB/removeFromFavourites',
);

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
      .addCase(fetchAllNews.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedNews = action.payload;
        state.hasError = null;
      })
      .addCase(fetchAllNews.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(fetchFavourites.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favourites = action.payload;
        state.hasError = null;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(fetchRead.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchRead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reads = action.payload;
        state.hasError = null;
      })
      .addCase(fetchRead.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(fetchArchivedNews.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchArchivedNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.archivedNews = action.payload;
        state.hasError = null;
      })
      .addCase(fetchArchivedNews.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(deleteNews.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.isLoading = false;
        const { _id: id } = action.payload;
        state.archivedNews = state.archivedNews.filter((news) => news._id !== id);
        state.hasError = null;
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(fetchHistoryLog.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchHistoryLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.historyLog = action.payload;
        state.hasError = null;
      })
      .addCase(fetchHistoryLog.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(removeFromFavourites, (state, action) => {
        const { newsUrl } = action.payload;
        state.favourites = state.favourites.filter((fav) => fav.newsUrl !== newsUrl);
      });
  },
});

export const { addOrUpdateVotedNews, clearVotedNews } = newsDBSlice.actions;
export const newsDBReducer = newsDBSlice.reducer;
