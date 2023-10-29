import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { weatherSlice } from './weather';
import { newsAPISlice } from './newsAPI';
import { newsDBSlice } from './newsDatabase';
import { articleSlice } from './article';
import votedNewsSlice from './votedNewsSlice';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { ThunkDispatch } from 'redux-thunk';
import { newswireSlice } from './newswire';

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

const store = configureStore({
  reducer: {
    weather: weatherSlice,
    popular: newsAPISlice,
    newsDB: newsDBSlice,
    votedNews: votedNewsSlice,
    article: articleSlice,
    newswire: newswireSlice,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type AppDispatch = typeof store.dispatch;

export default store;
