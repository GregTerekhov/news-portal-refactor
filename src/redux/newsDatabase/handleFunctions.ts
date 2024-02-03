import { PayloadAction } from '@reduxjs/toolkit';

import type { DispatchActionType } from 'reduxStore/store';
import type { NewsDBState } from 'types';

import * as newsDBOperations from './newsDatabaseOperations';

export const handlePending = (state: NewsDBState) => {
  state.isLoading = true;
  state.hasError = null;
};

export const handleFulfilled = (state: NewsDBState) => {
  state.isLoading = false;
  state.hasError = null;
};

export const handleRejected = (state: NewsDBState, action: PayloadAction<unknown, string, any>) => {
  state.isLoading = false;
  if (typeof action.payload === 'number') {
    state.hasError = action.payload ?? null;
    console.log('ERROR', action.payload, action);
  }
};

const extraActions = [
  newsDBOperations.fetchAllNews,
  newsDBOperations.fetchFavourites,
  newsDBOperations.fetchRead,
  newsDBOperations.fetchArchivedNews,
  newsDBOperations.deleteNews,
  newsDBOperations.fetchHistoryLog,
];

export const getActions = (type: DispatchActionType) => extraActions.map((action) => action[type]);
