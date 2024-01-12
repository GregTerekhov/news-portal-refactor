import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  Persistor,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { ThunkDispatch } from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import nonSerializableMiddleware from './middleware';
import { authReducer, filtersReducer, APIReducer, DBReducer, weatherReducer } from './reducers';

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(nonSerializableMiddleware);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'newsAPI', 'newsDB', 'weather', 'filters'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['userTheme', 'accessToken', 'refreshToken'],
};

const NewsDBPersistConfig = {
  key: 'newsDB',
  storage,
  whitelist: ['savedNews'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  newsAPI: APIReducer,
  newsDB: persistReducer(NewsDBPersistConfig, DBReducer),
  weather: weatherReducer,
  filters: filtersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type AppDispatch = typeof store.dispatch;

export default store;
