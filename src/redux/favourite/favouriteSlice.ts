import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularNews } from './favouriteOperations';

const initialState: any = {
  data: null,
};

const popularSlice: any = createSlice({
  name: 'popular',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularNews.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(fetchPopularNews.pending, (state, action) => {})
      .addCase(fetchPopularNews.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export default popularSlice.reducer;
