import { AnyAction, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  Persistor,
  persistStore,
} from 'redux-persist';
import type { ThunkDispatch } from 'redux-thunk';

import { persistedReducer } from './reducers';

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof persistedReducer>;
export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type AppDispatch = typeof store.dispatch;
export type DispatchActionType = 'pending' | 'fulfilled' | 'rejected';
