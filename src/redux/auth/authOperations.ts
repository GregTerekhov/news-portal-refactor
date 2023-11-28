import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  SignUpCredentials,
  SignInCredentials,
  IUpdateEmail,
  IUpdatePassword,
  ICurrentUser,
  IRecoveryPasswordChange,
  IRecoveryPasswordRequest,
  IThirdPartyAuth,
} from 'types';

import axiosInstance from './authServices';
import { setTokens } from './authSlice';
import axios from 'axios';
// import { RootState } from 'reduxStore/store';

const BASE_URL = 'https://news-webapp-express.onrender.com/api';

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
    console.log('credentials', credentials);
    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-up`, credentials);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: SignInCredentials, { rejectWithValue }) => {
    console.log('credentials', credentials);
    try {
      const response = await axiosInstance.post<ICurrentUser>(`/auth/sign-in`, credentials);
      setTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      // token.set(response.data.accessToken);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const signOut = createAsyncThunk('/auth/signOut', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('auth/sign-out');
    // token.unset();
    setTokens({ accessToken: null, refreshToken: null });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchCurrentUser = createAsyncThunk('auth/current', async (_, thunkAPI) => {
  // const state = thunkAPI.getState() as RootState;
  // const persistedToken = state.auth.accessToken;

  // if (persistedToken === null) {
  //   return thunkAPI.rejectWithValue('No token found');
  // }

  try {
    // token.set(persistedToken);
    const response = await axiosInstance.get('/auth/current-user');
    console.log(response.data.user);
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
export const recoveryPasswordRequest = createAsyncThunk(
  'auth/recoveryPasswordRequest',
  async (email: IRecoveryPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/auth/forgot-password-request`, email);
      // додати в header accessToken витягнути з URLSearchParams
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const recoveryPasswordChange = createAsyncThunk(
  'auth/recoveryPasswordChange',
  async (changedPassword: IRecoveryPasswordChange, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch('auth/forgot-password-change', changedPassword);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const googleAuth = createAsyncThunk(
  'auth/google',
  async (tokenAuth: IThirdPartyAuth, { rejectWithValue }) => {
    try {
      // token.set(tokenAuth); // set accessToken in Header
      setTokens({ accessToken: tokenAuth.tokenAuth, refreshToken: null });
      const response = await axiosInstance.get(`/auth/google`);
      response.data.accessToken = tokenAuth;
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const facebookAuth = createAsyncThunk(
  'auth/facebook',
  async (tokenAuth: IThirdPartyAuth, { rejectWithValue }) => {
    try {
      // token.set(tokenAuth); // set accessToken in Header
      setTokens({ accessToken: tokenAuth.tokenAuth, refreshToken: null });
      const response = await axiosInstance.get('/auth/facebook');
      response.data.accessToken = tokenAuth;
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const appleAuth = createAsyncThunk(
  'auth/apple',
  async (tokenAuth: IThirdPartyAuth, { rejectWithValue }) => {
    try {
      // token.set(tokenAuth); // set accessToken in Header
      setTokens({ accessToken: tokenAuth.tokenAuth, refreshToken: null });
      const response = await axiosInstance.get('/auth/apple');
      response.data.accessToken = tokenAuth;
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
