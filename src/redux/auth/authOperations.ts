import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance, BASE_URL_DB } from '../services';
import { setTokens } from './authSlice';

import {
  SignUpRequest,
  AuthRequestWithoutName,
  IThirdPartyAuth,
  RecoveryPasswordRequest,
  UpdateThemeRequest,
  GoogleResponse,
  CredentialSignUpResponse,
  CredentialSignInResponse,
  SignOutResponse,
  CurrentUserResponse,
  UpdateCredentialsResponse,
  UpdatePasswordResponse,
  UpdateThemeResponse,
  UpdatePasswordRequest,
  RecoveryPasswordChange,
} from 'types';

export const signUp = createAsyncThunk<CredentialSignUpResponse, SignUpRequest>(
  'auth/signUp',
  async (credentials, { rejectWithValue }) => {
    console.log('credentials', credentials);
    try {
      const response = await axios.post<CredentialSignUpResponse>(
        `${BASE_URL_DB}/auth/sign-up`,
        credentials,
      );
      console.log('SignUpResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('error', error.response);
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const signIn = createAsyncThunk<CredentialSignInResponse, AuthRequestWithoutName>(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    console.log('credentials', credentials);
    try {
      const response = await axios.post<CredentialSignInResponse>(
        `${BASE_URL_DB}/auth/sign-in`,
        credentials,
      );
      console.log('SignInResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error signIn', error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const signOut = createAsyncThunk<SignOutResponse>(
  '/auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<SignOutResponse>('/auth/sign-out');
      console.log('SignOutResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error signOut', error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk<CurrentUserResponse>(
  'auth/current',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<CurrentUserResponse>('/auth/current-user');
      console.log('CurrentUserResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error fetchCurrent', error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUserEmail = createAsyncThunk<UpdateCredentialsResponse, AuthRequestWithoutName>(
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
      console.log('Error updateEmail', error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);
export const updateUserPassword = createAsyncThunk<UpdatePasswordResponse, UpdatePasswordRequest>(
  'auth/updatePassword',
  async (newPassword, { rejectWithValue }) => {
    console.log('newPassword', newPassword);
    try {
      const response = await axiosInstance.patch<UpdatePasswordResponse>(
        '/auth/update-password',
        newPassword,
      );
      console.log('UpdatePasswordResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error updatePassword', error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);
export const recoveryPasswordRequest = createAsyncThunk<
  UpdatePasswordResponse,
  RecoveryPasswordRequest
>('auth/recoveryPasswordRequest', async (email, { rejectWithValue }) => {
  try {
    console.log('operations forgotRequest', email.email);
    const response = await axios.post(`${BASE_URL_DB}/auth/forgot-password-request`, email);
    console.log('recoveryPasswordRequest', response.data);
    return response.data;
  } catch (error: any) {
    console.log('Error forgotPasswordRequest', error.response.data);
    return rejectWithValue(error.response.data);
  }
});

export const recoveryPasswordChange = createAsyncThunk<
  UpdatePasswordResponse,
  RecoveryPasswordChange
>('auth/recoveryPasswordChange', async (changedPassword, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch<UpdatePasswordResponse>(
      '/auth/forgot-password-change',
      changedPassword,
    );
    console.log('recoveryPasswordChange', response.data);
    return response.data;
  } catch (error: any) {
    console.log('Error forgotPasswordChange', error.response.data);
    return rejectWithValue(error.response.data);
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
      console.log('Error googleAuth', error.response.data);
      return rejectWithValue(error.response.data);
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
      console.log('Error facebookAuth', error.response.data);
      return rejectWithValue(error.response.data);
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
      console.log('Error appleAuth', error.response.data);
      return rejectWithValue(error.response.data);
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
      console.log('Error updateTheme', error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);
