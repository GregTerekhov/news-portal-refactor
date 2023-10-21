import { configureStore } from '@reduxjs/toolkit';
import { weatherSlice } from './weather';
import { newsAPISlice } from './newsAPI';
import { newsDBSlice } from './newsDatabase';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

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
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
