import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchPopularNews } from './newsAPIOperations';
import { PopularNewsArray } from 'types';

type PopularState = {
  incomingData: {
    queryType: string;
    newsData: PopularNewsArray;
  };
  isLoading: boolean;
  hasError: SerializedError | null;
};

const initialState = {
  incomingData: {
    queryType: 'popular',
    newsData: [],
  },
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
        state.incomingData.newsData = action.payload;
        state.hasError = null;
      })
      .addCase(fetchPopularNews.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      });
  },
});

export default popularSlice.reducer;
