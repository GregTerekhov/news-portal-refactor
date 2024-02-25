import axios from 'axios';

import { CONFIG } from 'config';

import { requestWithInstanceTemplate, axiosInstance, createAppAsyncThunk } from '../services';
import { setTokens } from './authSlice';

import {
  MainCredentials,
  AuthRequestWithoutName,
  IThirdPartyAuth,
  SendEmailRequest,
  UpdateThemeRequest,
  CredentialSignUpResponse,
  CredentialSignInResponse,
  SignOutResponse,
  CurrentUserResponse,
  UpdateCredentialsResponse,
  ServicesInfo,
  UpdateThemeResponse,
  UpdatePasswordRequest,
  RecoveryPasswordChange,
  GoogleAuth,
  PasswordChangeResponse,
  BindSocialsResponse,
} from 'types';

export const signUp = createAppAsyncThunk<CredentialSignUpResponse, MainCredentials>(
  'auth/signUp',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<CredentialSignUpResponse>(
        `${CONFIG.BASE_URL_DB}/auth/sign-up`,
        credentials,
      );
      console.log('SignUpResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error SignUp', error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const signIn = createAppAsyncThunk<CredentialSignInResponse, AuthRequestWithoutName>(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<CredentialSignInResponse>(
        `${CONFIG.BASE_URL_DB}/auth/sign-in`,
        credentials,
      );
      console.log('SignInResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error signIn', error.response);
      return rejectWithValue(error.response.data);
    }
  },
);

export const signOut = requestWithInstanceTemplate<void, SignOutResponse>(
  '/auth/signOut',
  '/auth/sign-out',
  'post',
);

export const fetchCurrentUser = requestWithInstanceTemplate<void, CurrentUserResponse>(
  'auth/current',
  '/auth/current-user',
  'get',
);

export const updateUserEmail = requestWithInstanceTemplate<
  AuthRequestWithoutName,
  UpdateCredentialsResponse
>('auth/updateEmail', '/auth/update-email', 'patch');

export const updateUserPassword = requestWithInstanceTemplate<UpdatePasswordRequest, ServicesInfo>(
  'auth/updatePassword',
  '/auth/update-password',
  'patch',
);

export const recoveryPasswordRequest = requestWithInstanceTemplate<SendEmailRequest, ServicesInfo>(
  'auth/recoveryPasswordRequest',
  '/auth/forgot-password-request',
  'post',
);

export const recoveryPasswordChange = requestWithInstanceTemplate<
  RecoveryPasswordChange,
  PasswordChangeResponse
>('auth/recoveryPasswordChange', '/auth/forgot-password-change', 'post');

export const googleAuth = createAppAsyncThunk(
  'auth/googleAuth',
  async (credentials: GoogleAuth, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/auth/google/auth`, credentials);

      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error googleAuth', error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const googleBind = requestWithInstanceTemplate<SendEmailRequest, BindSocialsResponse>(
  'auth/googleBind',
  '/auth/google/bind',
  'patch',
);

export const googleUnbind = requestWithInstanceTemplate<void, BindSocialsResponse>(
  'auth/googleUnbind',
  '/auth/google/unbind',
  'patch',
);

export const facebookAuth = createAppAsyncThunk(
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
export const appleAuth = createAppAsyncThunk(
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

export const updateTheme = requestWithInstanceTemplate<UpdateThemeRequest, UpdateThemeResponse>(
  'auth/updateTheme',
  '/auth/update-theme',
  'patch',
);
