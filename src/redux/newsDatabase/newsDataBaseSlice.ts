import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchAllNews, fetchFavourites, fetchRead, addNews } from './newsDatabaseOperations';
// import type { PayloadAction } from '@reduxjs/toolkit';
import { PartialVotedNewsArray, VotedItem } from 'types';

interface SelectedNewsState {
  allSelectedNews: PartialVotedNewsArray;
  savedNews: PartialVotedNewsArray;
  favourites: PartialVotedNewsArray;
  reads: PartialVotedNewsArray;
  isLoading: boolean;
  hasError: SerializedError | null;
}

// type FavouritesAction = PayloadAction<
//   FavouritesArray,
//   string,
//   { arg: void; requestId: string; requestStatus: 'fulfilled' },
//   never
// >;

const initialState = {
  allSelectedNews: [],
  savedNews: [],
  favourites: [],
  reads: [],
  isLoading: false,
  hasError: null,
} as SelectedNewsState;

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

const newsDBSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addOrUpdateVotedNews: (state, action: PayloadAction<Partial<VotedItem>>) => {
      const updatedVotedNews = action.payload;
      const existingNewsIndex = state.allSelectedNews.findIndex(
        (news) => news.newsUrl === updatedVotedNews.newsUrl,
      );
      if (existingNewsIndex !== -1) {
        if (
          !!updatedVotedNews.isFavourite ||
          !!updatedVotedNews.hasRead ||
          (!!updatedVotedNews.isFavourite && !!updatedVotedNews.hasRead)
        ) {
          state.allSelectedNews[existingNewsIndex] = {
            ...state.allSelectedNews[existingNewsIndex],
            isFavourite: updatedVotedNews.isFavourite,
            hasRead: updatedVotedNews.hasRead,
          };
        } else {
          state.allSelectedNews.splice(existingNewsIndex, 1);
        }
      } else {
        state.allSelectedNews.push(updatedVotedNews);
      }
    },
    clearVotedNews: (state) => {
      state.allSelectedNews = [];
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
        state.allSelectedNews = action.payload;
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
      .addCase(addNews.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(addNews.fulfilled, (state, action) => {
        const {
          title,
          description,
          isFavourite,
          hasRead,
          publishDate,
          edition,
          author,
          category,
          imgLink,
          imgAlt,
          newsUrl,
        } = action.payload;
        console.log('action.payload', action.payload.data);
        const index = state.allSelectedNews.findIndex((news) => news.newsUrl === newsUrl);

        if (index !== -1) {
          state.allSelectedNews[index] = {
            title,
            description,
            isFavourite,
            hasRead,
            publishDate,
            edition,
            author,
            category,
            imgLink,
            imgAlt,
            newsUrl,
          };
        }
      })
      .addCase(addNews.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      });
  },
});

export const { addOrUpdateVotedNews, clearVotedNews } = newsDBSlice.actions;
export default newsDBSlice.reducer;
