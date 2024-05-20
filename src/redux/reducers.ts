import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { SliceName } from 'types';
import { authReducer } from './auth';
import { filtersReducer } from './filterSlice';
import { newsAPIReducer } from './newsAPI';
import { newsDBReducer } from './newsDatabase';
import { weatherReducer } from './weather';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [SliceName.Auth, SliceName.APINews, SliceName.DB, SliceName.Weather, SliceName.Filter],
};

const authPersistConfig = {
  key: SliceName.Auth,
  storage,
  whitelist: ['userTheme', 'accessToken', 'refreshToken', 'isLoggedIn'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  newsAPI: newsAPIReducer,
  newsDB: newsDBReducer,
  weather: weatherReducer,
  filters: filtersReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
