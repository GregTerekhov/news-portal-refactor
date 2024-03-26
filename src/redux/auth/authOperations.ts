import * as authTypes from 'types';

import {
  requestWithInstanceTemplate,
  axiosInstance, // буде видалено після імплементування third-party facebook/apple authentication
  createAppAsyncThunk, // буде видалено після імплементування third-party facebook/apple authentication
  requestTemplate,
} from '../services';

export const signUp = requestTemplate<
  authTypes.MainCredentials,
  authTypes.CredentialSignUpResponse
>('auth/signUp', '/auth/sign-up', 'post');

export const signIn = requestTemplate<authTypes.SignInRequest, authTypes.CredentialSignInResponse>(
  'auth/signIn',
  '/auth/sign-in',
  'post',
);

// export const sendCryptoPassword = requestTemplate<
//   authTypes.SendEncryptedPassword,
//   authTypes.ServicesInfo
// >('auth/sendCryptoPassword', '/auth/send-password', 'post');

export const getSavedPassword = requestTemplate<
  authTypes.GetCryptoPassword,
  authTypes.ResponseCryptoPassword
>('auth/getCryptoPassword', '/auth/get-password', 'get');

export const signOut = requestWithInstanceTemplate<void, authTypes.SignOutResponse>(
  'auth/signOut',
  '/auth/sign-out',
  'post',
);

export const fetchCurrentUser = requestWithInstanceTemplate<void, authTypes.CurrentUserResponse>(
  'auth/current',
  '/auth/current-user',
  'get',
);

export const updateUserEmail = requestWithInstanceTemplate<
  authTypes.AuthRequestWithoutName,
  authTypes.UpdateCredentialsResponse
>('auth/updateEmail', '/auth/update-email', 'patch');

export const updateUserPassword = requestWithInstanceTemplate<
  authTypes.UpdatePasswordRequest,
  authTypes.ServicesInfo
>('auth/updatePassword', '/auth/update-password', 'patch');

export const recoveryPasswordRequest = requestTemplate<
  authTypes.SendEmailRequest,
  authTypes.ServicesInfo
>('auth/recoveryPasswordRequest', '/auth/forgot-password-request', 'post');

export const recoveryPasswordChange = requestWithInstanceTemplate<
  authTypes.RecoveryPasswordChange,
  authTypes.PasswordChangeResponse
>('auth/recoveryPasswordChange', '/auth/forgot-password-change', 'post');

export const googleAuth = requestTemplate<authTypes.GoogleAuth, authTypes.CredentialSignInResponse>(
  'auth/googleAuth',
  '/auth/google/auth',
  'post',
);

export const googleBind = requestWithInstanceTemplate<
  authTypes.SendEmailRequest,
  authTypes.BindSocialsResponse
>('auth/googleBind', '/auth/google/bind', 'patch');

export const googleUnbind = requestWithInstanceTemplate<void, authTypes.BindSocialsResponse>(
  'auth/googleUnbind',
  '/auth/google/unbind',
  'patch',
);

export const updateTheme = requestWithInstanceTemplate<
  authTypes.UpdateThemeRequest,
  authTypes.UpdateThemeResponse
>('auth/updateTheme', '/auth/update-theme', 'patch');

export const facebookAuth = createAppAsyncThunk(
  'auth/facebook',
  async (tokenAuth: authTypes.IThirdPartyAuth, { rejectWithValue }) => {
    try {
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
  async (tokenAuth: authTypes.IThirdPartyAuth, { rejectWithValue }) => {
    try {
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
