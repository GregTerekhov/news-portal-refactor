import { PayloadAction } from '@reduxjs/toolkit';

import type { DispatchActionType } from 'reduxStore/store';
import type { newsAPIState } from 'types';

import * as newsAPIOperations from './newsAPIOperations';

export const handlePending = (state: newsAPIState) => {
  state.isLoading = true;
  state.hasError = null;
};

export const handleFulfilled = (state: newsAPIState) => {
  state.isLoading = false;
  state.hasError = null;
};

export const handleRejected = (
  state: newsAPIState,
  action: PayloadAction<unknown, string, any>,
) => {
  state.isLoading = false;
  if (typeof action.payload === 'number') {
    state.hasError = action.payload ?? null;
    console.log('ERROR', action.payload, action);
  }
};

const extraActions = [
  newsAPIOperations.fetchAllCategories,
  newsAPIOperations.fetchNewsByCategory,
  newsAPIOperations.fetchNewsByKeyword,
  newsAPIOperations.fetchPopularNews,
  newsAPIOperations.fetchNewsByDate,
];

export const getActions = (type: DispatchActionType) => extraActions.map((action) => action[type]);
