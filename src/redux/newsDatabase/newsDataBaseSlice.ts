import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchAllNews, fetchFavourites, fetchRead, addNews } from './newsDatabaseOperations';
// import type { PayloadAction } from '@reduxjs/toolkit';

type NewsItem = {
  _id: number;
  title: string;
  description: string;
  isFavourite: boolean;
  hasRead: boolean;
  publishDate: string;
  edition: string;
  author: string;
  category: string;
  imgLink: string;
  newsUrl: string;
};

type NewsArray = Partial<NewsItem>[];

interface SelectedNewsState {
  selectedNews: NewsArray;
  favourites: NewsArray;
  reads: NewsArray;
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
  selectedNews: [],
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.selectedNews = action.payload;
      })
      .addCase(fetchAllNews.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(fetchFavourites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.selectedNews = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(fetchRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRead.fulfilled, (state, action) => {
        state.selectedNews = action.payload;
      })
      .addCase(fetchRead.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      })
      .addCase(addNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNews.fulfilled, (state, action) => {
        const {
          _id: id,
          title,
          description,
          isFavourite,
          hasRead,
          publishDate,
          edition,
          author,
          category,
          imgLink,
          newsUrl,
        } = action.payload;
        const index = state.selectedNews.findIndex((news) => news._id === id);

        if (index !== -1) {
          state.selectedNews[index] = {
            _id: id,
            title,
            description,
            isFavourite,
            hasRead,
            publishDate,
            edition,
            author,
            category,
            imgLink,
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

export default newsDBSlice.reducer;
