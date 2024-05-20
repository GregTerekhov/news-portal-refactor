import { PayloadAction } from '@reduxjs/toolkit';

import { DispatchActionType, type NewsDBState } from 'types';
import * as newsDBOperations from './newsDatabaseOperations';

export const handlePending = (state: NewsDBState) => {
  state.isLoading = true;
  state.hasError = null;
};

export const handleFulfilled = (state: NewsDBState, action: PayloadAction<any, string, any>) => {
  state.isLoading = false;
  state.hasError = null;
  state.message = action.payload.message;
};

export const handleRejected = (state: NewsDBState, action: PayloadAction<unknown, string, any>) => {
  state.isLoading = false;
  if (typeof action.payload === 'number' || typeof action.payload === 'string')
    state.hasError = action.payload;
};

const extraActions = [
  newsDBOperations.fetchAllNews,
  newsDBOperations.fetchFavourites,
  newsDBOperations.fetchRead,
  newsDBOperations.fetchArchivedNews,
  newsDBOperations.deleteNews,
  newsDBOperations.fetchHistoryLog,
  newsDBOperations.clearHistoryLog,
];

export const getActions = (type: DispatchActionType) => extraActions.map((action) => action[type]);
