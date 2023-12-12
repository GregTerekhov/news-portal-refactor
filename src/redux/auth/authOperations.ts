import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from './authServices';
import { setTokens } from './authSlice';

import {
  SignUpRequiredFields,
  SignInRequiredFields,
  IUpdateEmail,
  ICurrentUser,
  IThirdPartyAuth,
  UpdatePasswordRequiredToSend,
  RecoveryPasswordRequestRequired,
  RecoveryPasswordChangeRequiredToSend,
  ITheme,
  GoogleResponse,
} from 'types';

type SignUpResponse = {
  name: string;
  email: string;
};

type FetchCurrentResponse = {
  user: {
    name: string;
    email: string;
    id: string;
  };
  userTheme: string;
};

type UpdateEmailResponse = {
  newEmail: string;
};

const BASE_URL = 'https://news-webapp-express.onrender.com/api';

export const signUp = createAsyncThunk<SignUpResponse, SignUpRequiredFields>(
  'auth/signUp',
  async (credentials, { rejectWithValue }) => {
    console.log('credentials', credentials);
    try {
      const response = await axios.post<SignUpResponse>(`${BASE_URL}/auth/sign-up`, credentials);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const signIn = createAsyncThunk<ICurrentUser, SignInRequiredFields>(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    console.log('credentials', credentials);
    try {
      const response = await axios.post<ICurrentUser>(`${BASE_URL}/auth/sign-in`, credentials);
      // setTokens({
      //   accessToken: response.data.accessToken,
      //   refreshToken: response.data.refreshToken,
      // });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error signIn', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const signOut = createAsyncThunk('/auth/signOut', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/auth/sign-out');
    setTokens({ accessToken: null, refreshToken: null });
    return response.data;
  } catch (error: any) {
    console.log('Error signOut', error.message);
    return rejectWithValue(error.message);
  }
});

export const fetchCurrentUser = createAsyncThunk<FetchCurrentResponse>(
  'auth/current',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get<FetchCurrentResponse>('/auth/current-user');
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error fetchCurrent', error.message);

      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateUserEmail = createAsyncThunk<UpdateEmailResponse, IUpdateEmail>(
  'auth/updateEmail',
  async (newEmail, { rejectWithValue }) => {
    console.log('newEmail', newEmail);
    try {
      const response = await axiosInstance.patch<UpdateEmailResponse>(
        '/auth/update-email',
        newEmail,
      );
      return response.data;
    } catch (error: any) {
      console.log('Error updateEmail', error.message);
      return rejectWithValue(error.message);
    }
  },
);
export const updateUserPassword = createAsyncThunk(
  'auth/updatePassword',
  async (newPassword: UpdatePasswordRequiredToSend, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch('/auth/update-password', newPassword);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error updatePassword', error.message);
      return rejectWithValue(error.message);
    }
  },
);
export const recoveryPasswordRequest = createAsyncThunk(
  'auth/recoveryPasswordRequest',
  async (email: RecoveryPasswordRequestRequired, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/auth/forgot-password-request`, email);
      return response.data;
    } catch (error: any) {
      console.log('Error forgotPasswordRequest', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const recoveryPasswordChange = createAsyncThunk(
  'auth/recoveryPasswordChange',
  async (changedPassword: RecoveryPasswordChangeRequiredToSend, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch('/auth/forgot-password-change', changedPassword);
      return response.data;
    } catch (error: any) {
      console.log('Error forgotPasswordChange', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const googleAuth = createAsyncThunk(
  'auth/google',
  async (codeResponse: GoogleResponse, { rejectWithValue }) => {
    try {
      setTokens({ accessToken: codeResponse.access_token, refreshToken: null });
      const response = await axiosInstance.post(`/auth/google`, { codeResponse });

      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error googleAuth', error.message);
      return rejectWithValue(error.message);
    }
  },
);
export const facebookAuth = createAsyncThunk(
  'auth/facebook',
  async (tokenAuth: IThirdPartyAuth, { rejectWithValue }) => {
    try {
      setTokens({ accessToken: tokenAuth.tokenAuth, refreshToken: null });
      const response = await axiosInstance.get('/auth/facebook');
      response.data.accessToken = tokenAuth;
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error facebookAuth', error.message);
      return rejectWithValue(error.message);
    }
  },
);
export const appleAuth = createAsyncThunk(
  'auth/apple',
  async (tokenAuth: IThirdPartyAuth, { rejectWithValue }) => {
    try {
      setTokens({ accessToken: tokenAuth.tokenAuth, refreshToken: null });
      const response = await axiosInstance.get('/auth/apple');
      response.data.accessToken = tokenAuth;
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error appleAuth', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updateTheme = createAsyncThunk(
  'auth/updateTheme',
  async (updatedTheme: ITheme, { rejectWithValue }) => {
    console.log('theme', updatedTheme);
    try {
      const response = await axiosInstance.patch('/auth/update-theme', updatedTheme);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error updateTheme', error.message);
      return rejectWithValue(error.message);
    }
  },
);
