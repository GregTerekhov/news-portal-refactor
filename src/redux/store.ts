import {
  configureStore,
  // getDefaultMiddleware
} from '@reduxjs/toolkit';
import { weatherSlice } from './weather';
import { popularSlice } from './favourite';
// import { AxiosHeaders, AxiosError } from 'axios';

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    popular: popularSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [AxiosHeaders, AxiosError],
  //     },
  //   }),
});
