import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from 'reduxStore/store';

import { AuthCredentials } from 'types';

axios.defaults.baseURL = 'https://news-webapp-express.onrender.com/api';

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: AuthCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/sign-up', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: Partial<AuthCredentials>, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/sign-in', credentials);
      token.set(response.data.accessToken);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const signOut = createAsyncThunk('/auth/signOut', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('auth/sign-out');
    token.unset();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchCurrentUser = createAsyncThunk('auth/current', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const persistedToken = state.auth.refreshToken;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue('No token found');
  }
  token.set(persistedToken);
  try {
    const response = await axios.get('/auth/current-user');
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
