import { createSlice } from '@reduxjs/toolkit';
import weatherOperations from './weatherOperations';

const initialState: any = {
  data: null,
};

const weatherSlice: any = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(weatherOperations.fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload.data;
        console.log(state.data);
      })
      .addCase(weatherOperations.fetchWeather.rejected, () => {});
  },
});

export default weatherSlice.reducer;
