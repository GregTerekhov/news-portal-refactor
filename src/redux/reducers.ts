import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth';
import { filtersReducer } from './filterSlice';
import { newsAPIReducer } from './newsAPI';
import { newsDBReducer } from './newsDatabase';
import { weatherReducer } from './weather';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'newsAPI', 'newsDB', 'weather', 'filters'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['userTheme', 'accessToken', 'refreshToken', 'isLoggedIn'],
};

const NewsDBPersistConfig = {
  key: 'newsDB',
  storage,
  whitelist: ['savedNews'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  newsAPI: newsAPIReducer,
  newsDB: persistReducer(NewsDBPersistConfig, newsDBReducer),
  weather: weatherReducer,
  filters: filtersReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
