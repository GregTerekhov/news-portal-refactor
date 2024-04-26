import { PayloadAction } from '@reduxjs/toolkit';

import type { WeatherState, newsAPIState } from 'types';

type AppState = newsAPIState | WeatherState;

export const handlePending = (state: AppState): void => {
  state.isLoading = true;
  state.hasError = null;
};

export const handleFulfilled = (state: AppState): void => {
  state.isLoading = false;
  state.hasError = null;
};

export const handleRejected = (
  state: AppState,
  action: PayloadAction<unknown, string, any>,
): void => {
  state.isLoading = false;

  if (typeof action.payload === 'number') state.hasError = action.payload;
};
