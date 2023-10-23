import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchWeather } from './weatherOperations';
import { WeatherData } from 'types';

type WeatherState = {
  isLoading: boolean;
  data: WeatherData;
  hasError: SerializedError | null;
};

const initialState = {
  data: {},
  isLoading: false,
  hasError: null,
} as WeatherState;

const weatherSlice: any = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.hasError = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      });
  },
});

export default weatherSlice.reducer;
