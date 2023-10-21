import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchPopularNews } from './newsAPIOperations';

type PopularItem = {
  abstract: string;
  id: string;
  media: {
    'media-metadata': {
      url: string;
    }[];
  }[];
  published_date: string;
  section: string;
  source: string;
  title: string;
  type: string;
  url: string;
};

type PopularArray = PopularItem[];

type PopularState = {
  popularNews: PopularArray;
  isLoading: boolean;
  hasError: SerializedError | null;
};

const initialState = {
  popularNews: [],
  isLoading: false,
  hasError: null,
} as PopularState;

const popularSlice: any = createSlice({
  name: 'popular',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularNews.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchPopularNews.fulfilled, (state, action) => {
        state.popularNews = action.payload;
        state.hasError = null;
      })
      .addCase(fetchPopularNews.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      });
  },
});

export default popularSlice.reducer;
