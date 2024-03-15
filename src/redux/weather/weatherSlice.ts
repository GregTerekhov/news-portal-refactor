import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import type { DispatchActionType } from 'reduxStore/store';
import type { WeatherState } from 'types';

import { fetchWeather, fetchHourlyForecastWeather } from './weatherOperations';

import { handleFulfilled, handlePending, handleRejected } from '../services';

const initialState = {
  data: {},
  weatherByHour: [],
  isLoading: false,
  hasError: null,
} as WeatherState;

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

const extraActions = [fetchWeather, fetchHourlyForecastWeather];

const getActions = (type: DispatchActionType) => extraActions.map((action) => action[type]);

export const weatherReducer = weatherSlice.reducer;
