import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { weatherSlice } from './weather';
import { newsAPISlice } from './newsAPI';
import { newsDBSlice } from './newsDatabase';
import votedNewsSlice from './votedNewsSlice';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { ThunkDispatch } from 'redux-thunk';

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
    votedNews: votedNewsSlice,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type AppDispatch = typeof store.dispatch;

export default store;
