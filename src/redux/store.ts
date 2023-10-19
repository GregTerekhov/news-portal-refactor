import { configureStore } from '@reduxjs/toolkit';
import { weatherSlice } from './weather';
import { newsSlice } from './news';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    popular: newsSlice,
  },
  middleware,
});
