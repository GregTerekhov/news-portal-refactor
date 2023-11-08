import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchWeather, fetchHourlyForecastWeather } from './weatherOperations';
import { WeatherData } from 'types';

type WeatherState = {
  isLoading: boolean;
  data: WeatherData;
  weatherByHour: any;
  hasError: SerializedError | null;
};

const initialState = {
  data: {},
  weatherByHour: {},
  isLoading: false,
  hasError: null,
} as WeatherState;

const weatherSlice = createSlice({
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
      })
      .addCase(fetchHourlyForecastWeather.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(fetchHourlyForecastWeather.fulfilled, (state, action) => {
        state.weatherByHour = action.payload;
        state.hasError = null;
      })
      .addCase(fetchHourlyForecastWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      });
  },
});

export default weatherSlice.reducer;
