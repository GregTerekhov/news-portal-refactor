import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularNews } from './newsOperations';

const initialState: any = {
  data: null,
};

const popularSlice: any = createSlice({
  name: 'popular',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPopularNews.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default popularSlice.reducer;
