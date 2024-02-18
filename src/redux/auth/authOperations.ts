import axios from 'axios';

import { CONFIG } from 'config';

import { axiosInstance, createAppAsyncThunk } from '../services';
import { setTokens } from './authSlice';

import {
  SignUpRequest,
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
} from 'types';

export const signUp = createAppAsyncThunk<CredentialSignUpResponse, SignUpRequest>(
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
      console.log('Error SignUp', error.response.toJSON());
      return rejectWithValue(error.response);
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
      return rejectWithValue(error.response);
    }
  },
);

export const signOut = createAppAsyncThunk<SignOutResponse>(
  '/auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<SignOutResponse>('/auth/sign-out');
      console.log('SignOutResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error signOut', error.response);
      return rejectWithValue(error.response);
    }
  },
);

export const fetchCurrentUser = createAppAsyncThunk<CurrentUserResponse>(
  'auth/current',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<CurrentUserResponse>('/auth/current-user');
      console.log('CurrentUserResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error fetchCurrent', error.response);
      return rejectWithValue(error.response);
    }
  },
);

export const updateUserEmail = createAppAsyncThunk<
  UpdateCredentialsResponse,
  AuthRequestWithoutName
>('auth/updateEmail', async (newEmail, { rejectWithValue }) => {
  console.log('newEmail', newEmail);
  try {
    const response = await axiosInstance.patch<UpdateCredentialsResponse>(
      `/auth/update-email`,
      newEmail,
    );
    console.log('UpdateCredentialsResponse', response.data);
    return response.data;
  } catch (error: any) {
    console.log('Error updateEmailMessage', error.response);
    return rejectWithValue(error.response);
  }
});

export const updateUserPassword = createAppAsyncThunk<ServicesInfo, UpdatePasswordRequest>(
  'auth/updatePassword',
  async (newPassword, { rejectWithValue }) => {
    console.log('newPassword', newPassword);
    try {
      const response = await axiosInstance.patch<ServicesInfo>(
        '/auth/update-password',
        newPassword,
      );
      console.log('UpdatePasswordResponse', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error updatePassword', error.response);
      return rejectWithValue(error.response);
    }
  },
);
export const recoveryPasswordRequest = createAppAsyncThunk<ServicesInfo, SendEmailRequest>(
  'auth/recoveryPasswordRequest',
  async (email, { rejectWithValue }) => {
    try {
      console.log('operations forgotRequest', email.email);
      const response = await axios.post(
        `${CONFIG.BASE_URL_DB}/auth/forgot-password-request`,
        email,
      );
      console.log('recoveryPasswordRequest', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error forgotPasswordRequest', error.response);
      return rejectWithValue(error.response);
    }
  },
);

export const recoveryPasswordChange = createAppAsyncThunk<ServicesInfo, RecoveryPasswordChange>(
  'auth/recoveryPasswordChange',
  async (changedPassword, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch<ServicesInfo>(
        '/auth/forgot-password-change',
        changedPassword,
      );
      console.log('recoveryPasswordChange', response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error forgotPasswordChange', error.response);
      return rejectWithValue(error.response);
    }
  },
);

export const googleAuth = createAppAsyncThunk(
  'auth/googleAuth',
  async (credentials: GoogleAuth, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/auth/google/auth`, credentials);

      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error googleAuth', error.response.data);
      return rejectWithValue(error.response);
    }
  },
);

export const googleBind = createAppAsyncThunk(
  'auth/googleBind',
  async (email: SendEmailRequest, { rejectWithValue }) => {
    console.log('email', email);
    try {
      const response = await axiosInstance.patch(`/auth/google/bind`, email);

      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error googleBind', error.response.data);
      return rejectWithValue(error.response);
    }
  },
);
export const googleUnbind = createAppAsyncThunk(
  'auth/googleUnbind',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/auth/google/unbind`);

      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log('Error googleUnbind', error.response.data);
      return rejectWithValue(error.response);
    }
  },
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
      return rejectWithValue(error.response);
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
      return rejectWithValue(error.response);
    }
  },
);

export const updateTheme = createAppAsyncThunk<UpdateThemeResponse, UpdateThemeRequest>(
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
      console.log('Error updateTheme', error.response);
      return rejectWithValue(error.response);
    }
  },
);
