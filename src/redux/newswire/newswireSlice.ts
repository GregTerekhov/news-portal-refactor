import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchNewswire } from './newswireOperations';
import { PartialGeneralNewsArray } from 'types';

type NewswireState = {
  incomingData: {
    queryType: string;
    newsData: PartialGeneralNewsArray;
  };
  isLoading: boolean;
  hasError: SerializedError | null;
};

const initialState = {
  incomingData: {
    queryType: 'categories',
    newsData: [],
  },
  isLoading: false,
  hasError: null,
} as NewswireState;

const newswireSlice: any = createSlice({
  name: 'popular',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewswire.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchNewswire.fulfilled, (state, action) => {
        state.incomingData.newsData = action.payload;
        state.hasError = null;
      })
      .addCase(fetchNewswire.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      });
  },
});

export default newswireSlice.reducer;
