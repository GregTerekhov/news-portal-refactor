import { AnyAction, configureStore } from '@reduxjs/toolkit';
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
  });

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type AppDispatch = typeof store.dispatch;
export type DispatchActionType = 'pending' | 'fulfilled' | 'rejected';
