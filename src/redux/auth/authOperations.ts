import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from './authServices';
import { setTokens } from './authSlice';

import {
  SignUpRequest,
  AuthRequestWithoutName,
  IUpdateEmail,
  IThirdPartyAuth,
  UpdatePasswordRequiredToSend,
  RecoveryPasswordRequestRequired,
  RecoveryPasswordChangeRequiredToSend,
  UpdateThemeRequest,
  GoogleResponse,
  CredentialSignUpResponse,
  CredentialSignInResponse,
  SignOutResponse,
  CurrentUserResponse,
  UpdateCredentialsResponse,
  UpdatePasswordResponse,
  UpdateThemeResponse,
} from 'types';

const BASE_URL = 'https://news-webapp-express.onrender.com/api';

export const signUp = createAsyncThunk<CredentialSignUpResponse, SignUpRequest>(
  'auth/signUp',
  async (credentials, { rejectWithValue }) => {
    console.log('credentials', credentials);
    try {
      const response = await axios.post<CredentialSignUpResponse>(
        `${BASE_URL}/auth/sign-up`,
        credentials,
      );
      console.log('SignUpResponse', response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const signIn = createAsyncThunk<CredentialSignInResponse, AuthRequestWithoutName>(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    console.log('credentials', credentials);
    try {
      const response = await axios.post<CredentialSignInResponse>(
        `${BASE_URL}/auth/sign-in`,
        credentials,
      );
      console.log('SignInResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error signIn', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const signOut = createAsyncThunk<SignOutResponse>(
  '/auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<SignOutResponse>('/auth/sign-out');
      // setTokens({ accessToken: null, refreshToken: null });
      console.log('SignOutResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error signOut', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk<CurrentUserResponse>(
  'auth/current',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get<CurrentUserResponse>('/auth/current-user');
      console.log('CurrentUserResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error fetchCurrent', error.message);

      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateUserEmail = createAsyncThunk<UpdateCredentialsResponse, IUpdateEmail>(
  'auth/updateEmail',
  async (newEmail, { rejectWithValue }) => {
    console.log('newEmail', newEmail);
    try {
      const response = await axiosInstance.patch<UpdateCredentialsResponse>(
        '/auth/update-email',
        newEmail,
      );
      console.log('UpdateCredentialsResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error updateEmail', error.message);
      return rejectWithValue(error.message);
    }
  },
);
export const updateUserPassword = createAsyncThunk<
  UpdatePasswordResponse,
  UpdatePasswordRequiredToSend
>('auth/updatePassword', async (newPassword, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch<UpdatePasswordResponse>(
      '/auth/update-password',
      newPassword,
    );
    console.log('UpdatePasswordResponse', response.data);
    return response.data;
  } catch (error: any) {
    console.log('Error updatePassword', error.message);
    return rejectWithValue(error.message);
  }
});
export const recoveryPasswordRequest = createAsyncThunk<
  UpdatePasswordResponse,
  RecoveryPasswordRequestRequired
>('auth/recoveryPasswordRequest', async (email, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${BASE_URL}/auth/forgot-password-request`, email);
    console.log('recoveryPasswordRequest', response.data);
    return response.data;
  } catch (error: any) {
    console.log('Error forgotPasswordRequest', error.message);
    return rejectWithValue(error.message);
  }
});

export const recoveryPasswordChange = createAsyncThunk<
  UpdatePasswordResponse,
  RecoveryPasswordChangeRequiredToSend
>('auth/recoveryPasswordChange', async (changedPassword, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch<UpdatePasswordResponse>(
      '/auth/forgot-password-change',
      changedPassword,
    );
    console.log('recoveryPasswordChange', response.data);
    return response.data;
  } catch (error: any) {
    console.log('Error forgotPasswordChange', error.message);
    return rejectWithValue(error.message);
  }
});

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

export const updateTheme = createAsyncThunk<UpdateThemeResponse, UpdateThemeRequest>(
  'auth/updateTheme',
  async (updatedTheme, { rejectWithValue }) => {
    console.log('theme', updatedTheme);
    try {
      const response = await axiosInstance.patch<UpdateThemeResponse>(
        '/auth/update-theme',
        updatedTheme,
      );
      console.log('UpdateThemeResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error updateTheme', error.message);
      return rejectWithValue(error.message);
    }
  },
);
