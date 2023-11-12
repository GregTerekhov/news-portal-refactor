import { weatherSliceReducer } from './weather';
import { newsAPIReducer } from './newsAPI';
import { newsDBReducer } from './newsDatabase';
import { filtersSliceReducer } from './filterSlice';
import { authSliceReducer } from './auth';

export const authReducer = authSliceReducer;
export const filtersReducer = filtersSliceReducer;
export const APIReducer = newsAPIReducer;
export const DBReducer = newsDBReducer;
export const weatherReducer = weatherSliceReducer;
