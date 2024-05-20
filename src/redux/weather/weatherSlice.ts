import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DispatchActionType, SliceName, WeatherState } from 'types';

import { fetchWeather, fetchHourlyForecastWeather } from './weatherOperations';
import { handleFulfilled, handlePending, handleRejected } from '../services';

const initialState = {
  data: {},
  weatherByHour: [],
  isLoading: false,
  hasError: null,
} as WeatherState;

const weatherSlice = createSlice({
  name: SliceName.Weather,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(fetchHourlyForecastWeather.fulfilled, (state, { payload }) => {
        state.weatherByHour = payload;
      })
      .addMatcher(isAnyOf(...getActions(DispatchActionType.Pending)), handlePending)
      .addMatcher(isAnyOf(...getActions(DispatchActionType.Fulfilled)), handleFulfilled)
      .addMatcher(isAnyOf(...getActions(DispatchActionType.Rejected)), handleRejected);
  },
});

const extraActions = [fetchWeather, fetchHourlyForecastWeather];

const getActions = (type: DispatchActionType) => extraActions.map((action) => action[type]);

export const weatherReducer = weatherSlice.reducer;
