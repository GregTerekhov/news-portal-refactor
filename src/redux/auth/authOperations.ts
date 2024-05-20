import {
  Routes,
  HTTPMethods,
  OperationName,
  type MainCredentials,
  type CredentialSignUpResponse,
  type SignInRequest,
  type CredentialSignInResponse,
  type GetCryptoPassword,
  type ResponseCryptoPassword,
  type CurrentUserResponse,
  type AuthRequestWithoutName,
  type UpdateCredentialsResponse,
  type UpdatePasswordRequest,
  type ServicesInfo,
  type SendEmailRequest,
  type RecoveryPasswordChange,
  type PasswordChangeResponse,
  type GoogleAuth,
  type GoogleAuthResponse,
  type BindSocialsResponse,
  type UpdateThemeRequest,
  type UpdateThemeResponse,
} from 'types';

import { requestWithInstanceTemplate, requestTemplate } from '../services';

export const signUp = requestTemplate<MainCredentials, CredentialSignUpResponse>(
  OperationName.SignUp,
  Routes.SignUp,
  HTTPMethods.POST,
);

export const signIn = requestTemplate<SignInRequest, CredentialSignInResponse>(
  OperationName.SignIn,
  Routes.SignIn,
  HTTPMethods.POST,
);

export const getSavedCredentials = requestTemplate<GetCryptoPassword, ResponseCryptoPassword>(
  OperationName.CryptoData,
  Routes.CryptoData,
  HTTPMethods.POST,
);

export const signOut = requestWithInstanceTemplate<void, ServicesInfo>(
  OperationName.SignOut,
  Routes.SignOut,
  HTTPMethods.POST,
);

export const fetchCurrentUser = requestWithInstanceTemplate<void, CurrentUserResponse>(
  OperationName.CurrentUser,
  Routes.CurrentUser,
  HTTPMethods.GET,
);

export const updateUserEmail = requestWithInstanceTemplate<
  AuthRequestWithoutName,
  UpdateCredentialsResponse
>(OperationName.UpdateEmail, Routes.UpdateEmail, HTTPMethods.PATCH);

export const updateUserPassword = requestWithInstanceTemplate<UpdatePasswordRequest, ServicesInfo>(
  OperationName.UpdatePassword,
  Routes.UpdatePassword,
  HTTPMethods.PATCH,
);

export const recoveryPasswordRequest = requestTemplate<SendEmailRequest, ServicesInfo>(
  OperationName.SendRecoveryEmail,
  Routes.SendRecoveryEmail,
  HTTPMethods.POST,
);

export const recoveryPasswordChange = requestWithInstanceTemplate<
  RecoveryPasswordChange,
  PasswordChangeResponse
>(OperationName.PasswordChange, Routes.PasswordChange, HTTPMethods.POST);

export const googleAuth = requestTemplate<GoogleAuth, GoogleAuthResponse>(
  OperationName.GoogleAuth,
  Routes.GoogleAuth,
  HTTPMethods.POST,
);

export const googleBind = requestWithInstanceTemplate<SendEmailRequest, BindSocialsResponse>(
  OperationName.GoogleBind,
  Routes.GoogleBind,
  HTTPMethods.PATCH,
);

export const googleUnbind = requestWithInstanceTemplate<void, BindSocialsResponse>(
  OperationName.GoogleUnbind,
  Routes.GoogleUnbind,
  HTTPMethods.PATCH,
);

export const updateTheme = requestWithInstanceTemplate<UpdateThemeRequest, UpdateThemeResponse>(
  OperationName.UpdateTheme,
  Routes.UpdateTheme,
  HTTPMethods.PATCH,
);
