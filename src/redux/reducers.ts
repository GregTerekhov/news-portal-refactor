import { authSliceReducer } from './auth';
import { filtersSliceReducer } from './filterSlice';
import { newsAPIReducer } from './newsAPI';
import { newsDBReducer } from './newsDatabase';
import { weatherSliceReducer } from './weather';

export const authReducer = authSliceReducer;
export const filtersReducer = filtersSliceReducer;
export const APIReducer = newsAPIReducer;
export const DBReducer = newsDBReducer;
export const weatherReducer = weatherSliceReducer;
