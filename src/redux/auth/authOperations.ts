import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  SignUpCredentials,
  SignInCredentials,
  IUpdateEmail,
  IUpdatePassword,
  IRecoveryPassword,
} from 'types';

import axiosInstance from './authServices';
import { setTokens } from './authSlice';

// axios.defaults.baseURL = 'https://news-webapp-express.onrender.com/api';

// const token = {
//   set(token: string) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: SignUpCredentials, { rejectWithValue }) => {
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
  async (credentials: SignInCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/sign-in', credentials);
      setTokens(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const signOut = createAsyncThunk('/auth/signOut', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('auth/sign-out');
    setTokens({ accessToken: null, refreshToken: null });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchCurrentUser = createAsyncThunk('auth/current', async (_, thunkAPI) => {
  // const state = thunkAPI.getState() as RootState;
  // const persistedToken = state.auth.refreshToken;

  // if (persistedToken === null) {
  //   return thunkAPI.rejectWithValue('No token found');
  // }
  // token.set(persistedToken);

  try {
    const response = await axiosInstance.get('/auth/current-user');
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUserEmail = createAsyncThunk(
  'auth/updateEmail',
  async (newEmail: IUpdateEmail, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch('auth/update-email', newEmail);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const updateUserPassword = createAsyncThunk(
  'auth/updatePassword',
  async (newPassword: IUpdatePassword, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch('auth/update-password', newPassword);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const sendPasswordRecoveryEmail = createAsyncThunk(
  'auth/recoveryPassword',
  async (email: IRecoveryPassword, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch('auth/recovery-password', email);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
