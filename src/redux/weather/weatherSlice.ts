import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { HourlyWeatherData, WeatherData } from 'types';

import { fetchWeather, fetchHourlyForecastWeather } from './weatherOperations';

type WeatherError = {
  cod?: string;
  message?: string;
};

interface WeatherState {
  isLoading: boolean;
  data: WeatherData;
  weatherByHour: HourlyWeatherData;
  hasError: WeatherError | null;
}

const initialState = {
  data: {},
  weatherByHour: {},
  isLoading: false,
  hasError: null,
} as WeatherState;

const handlePending = (state: WeatherState) => {
  state.isLoading = true;
  state.hasError = null;
};

const handleFulfilled = (state: WeatherState) => {
  state.isLoading = false;
  state.hasError = null;
};

const handleRejected = (state: WeatherState, action: PayloadAction<unknown, string, any>) => {
  state.isLoading = false;
  state.hasError = action.payload ?? null;
};

const extraActions = [fetchWeather, fetchHourlyForecastWeather];

const getActions = (type: 'pending' | 'fulfilled' | 'rejected') =>
  extraActions.map((action) => action[type]);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchHourlyForecastWeather.fulfilled, (state, action) => {
        state.weatherByHour = action.payload;
      })
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected);
  },
});

export const weatherSliceReducer = weatherSlice.reducer;
