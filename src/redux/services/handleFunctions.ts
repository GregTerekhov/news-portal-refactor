import { PayloadAction } from '@reduxjs/toolkit';

import { WeatherState, newsAPIState } from 'types';

type AppState = newsAPIState | WeatherState;

export const handlePending = (state: AppState) => {
  state.isLoading = true;
  state.hasError = null;
};

export const handleFulfilled = (state: AppState) => {
  state.isLoading = false;
  state.hasError = null;
};

export const handleRejected = (state: AppState, action: PayloadAction<unknown, string, any>) => {
  state.isLoading = false;

  if (typeof action.payload === 'number' || typeof action.payload === 'object') {
    state.hasError = action.payload;
    console.log('ERROR', action.payload, action);
  }
};
