import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchAllNews, fetchFavourites, fetchRead } from './newsDatabaseOperations';
// import type { PayloadAction } from '@reduxjs/toolkit';
import { PartialVotedNewsArray, VotedItem } from 'types';

interface SelectedNewsState {
  savedNews: PartialVotedNewsArray;
  favourites: PartialVotedNewsArray;
  reads: PartialVotedNewsArray;
  isLoading: boolean;
  hasError: SerializedError | null;
  // unsavedChanges: boolean;
}

// type FavouritesAction = PayloadAction<
//   FavouritesArray,
//   string,
//   { arg: void; requestId: string; requestStatus: 'fulfilled' },
//   never
// >;

const initialState = {
  savedNews: [],
  favourites: [],
  reads: [],
  isLoading: false,
  hasError: null,
  // unsavedChanges: false,
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
  name: 'newsDB',
  initialState,
  reducers: {
    addOrUpdateVotedNews: (state, action: PayloadAction<Partial<VotedItem>>) => {
      const updatedVotedNews = action.payload;
      console.log('updatedVotedNews', updatedVotedNews);
      const existingNewsIndex = state.savedNews.findIndex(
        (news) => news.newsUrl === updatedVotedNews.newsUrl,
      );
      if (existingNewsIndex !== -1) {
        if (
          !!updatedVotedNews.isFavourite ||
          !!updatedVotedNews.hasRead ||
          (!!updatedVotedNews.isFavourite && !!updatedVotedNews.hasRead)
        ) {
          state.savedNews[existingNewsIndex] = {
            ...state.savedNews[existingNewsIndex],
            isFavourite: updatedVotedNews.isFavourite,
            hasRead: updatedVotedNews.hasRead,
          };
          // state.unsavedChanges = true;
        }
      } else {
        state.savedNews.unshift(updatedVotedNews);
        // state.unsavedChanges = true;
      }
    },
    removeFromFavourites: (state, action) => {
      const { newsUrl } = action.payload;
      console.log(action.payload);
      state.favourites = state.favourites.filter((fav) => fav.newsUrl !== newsUrl);
    },
    // saveUnsavedChanges: (state) => {
    //   state.unsavedChanges = false;
    // },
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
      });
    // .addCase(addNews.pending, (state) => {
    //   state.isLoading = true;
    //   state.hasError = null;
    // })
    // .addCase(addNews.fulfilled, (state, action) => {
    //   const {
    //     title,
    //     description,
    //     isFavourite,
    //     hasRead,
    //     publishDate,
    //     edition,
    //     author,
    //     category,
    //     imgLink,
    //     imgAlt,
    //     newsUrl,
    //     // materialType,
    //   } = action.payload;
    //   console.log('action.payload', action.payload);

    //   const index = state.savedNews.findIndex((news) => news.newsUrl === newsUrl);

    //   if (index !== -1) {
    //     state.savedNews[index] = {
    //       title,
    //       description,
    //       isFavourite: isFavourite,
    //       hasRead: hasRead,
    //       publishDate,
    //       edition,
    //       author,
    //       category,
    //       imgLink,
    //       imgAlt,
    //       newsUrl,
    //       // materialType,
    //     };
    //   }
    // })
    // .addCase(addNews.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.hasError = action.error;
    // });
  },
});
// export const removeFromFavouritesAction = (newsUrl, hasRead) => (dispatch) => {
//   dispatch(removeFromFavourites({newsUrl, hasRead}))
// }
export const { addOrUpdateVotedNews, removeFromFavourites, clearVotedNews } = newsDBSlice.actions;
export default newsDBSlice.reducer;
