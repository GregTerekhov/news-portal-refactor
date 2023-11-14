import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchWeather, fetchHourlyForecastWeather } from './weatherOperations';
import { HourlyWeatherData, WeatherData } from 'types';

interface WeatherState {
  isLoading: boolean;
  data: WeatherData;
  weatherByHour: HourlyWeatherData;
  hasError: SerializedError | null;
}

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
        state.isLoading = false;
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
        state.isLoading = false;
        state.weatherByHour = action.payload;
        state.hasError = null;
      })
      .addCase(fetchHourlyForecastWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error;
      });
  },
});

export const weatherSliceReducer = weatherSlice.reducer;
