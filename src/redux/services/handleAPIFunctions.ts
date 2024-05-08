import { PayloadAction } from '@reduxjs/toolkit';

import type { WeatherState, newsAPIState } from 'types';

type APIState = newsAPIState | WeatherState;

export const handlePending = (state: APIState): void => {
  state.isLoading = true;
  state.hasError = null;
};

export const handleFulfilled = (state: APIState): void => {
  state.isLoading = false;
  state.hasError = null;
};

export const handleRejected = (
  state: APIState,
  action: PayloadAction<unknown, string, any>,
): void => {
  state.isLoading = false;

  if (typeof action.payload === 'number') state.hasError = action.payload;
};
