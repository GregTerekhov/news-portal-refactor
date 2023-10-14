import { createSlice } from '@reduxjs/toolkit';
import { fetchWeather } from './weatherOperations';

const initialState: any = {
  data: null,
};

const weatherSlice: any = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload.data;
        console.log(state.data);
      })
      .addCase(fetchWeather.rejected, () => {});
  },
});

export default weatherSlice.reducer;
