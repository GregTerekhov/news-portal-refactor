import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { weatherSlice } from './weather';
import { newsAPISlice } from './newsAPI';
import { newsDBSlice } from './newsDatabase';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { ThunkDispatch } from 'redux-thunk';
import filterSlice from './filterSlice';

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

const store = configureStore({
  reducer: {
    weather: weatherSlice,
    newsAPI: newsAPISlice,
    newsDB: newsDBSlice,
    filters: filterSlice,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type AppDispatch = typeof store.dispatch;

export default store;
