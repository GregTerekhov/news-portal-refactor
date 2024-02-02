import { PayloadAction } from '@reduxjs/toolkit';

import type { WeatherState } from 'types/weather';
import type { DispatchActionType } from 'reduxStore/store';

import { fetchWeather, fetchHourlyForecastWeather } from './weatherOperations';

export const handlePending = (state: WeatherState) => {
  state.isLoading = true;
  state.hasError = null;
};

export const handleFulfilled = (state: WeatherState) => {
  state.isLoading = false;
  state.hasError = null;
};

export const handleRejected = (
  state: WeatherState,
  action: PayloadAction<unknown, string, any>,
) => {
  state.isLoading = false;
  state.hasError = action.payload ?? null;
};

const extraActions = [fetchWeather, fetchHourlyForecastWeather];

export const getActions = (type: DispatchActionType) => extraActions.map((action) => action[type]);
