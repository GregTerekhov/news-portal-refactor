import { PayloadAction } from '@reduxjs/toolkit';

import type { DispatchActionType } from 'reduxStore/store';
import type { AuthState } from 'types';

import * as authOperations from './authOperations';

export const handlePending = (state: AuthState) => {
  state.isCurrentUser = true;
  state.hasError = null;
};

export const handleFulfilled = (state: AuthState, action: PayloadAction<any, string, any>) => {
  state.isCurrentUser = false;
  state.hasError = null;
  state.message = action.payload.message;
};

export const handleRejected = (state: AuthState, action: PayloadAction<unknown, string, any>) => {
  state.isCurrentUser = false;
  if (typeof action.payload === 'string') {
    state.hasError = action.payload;
    console.log('AuthError', state.hasError);
  }
};

export const getActions = (type: DispatchActionType) => {
  const extraActions = [
    authOperations.signUp,
    authOperations.signIn,
    // authOperations.sendCryptoPassword,
    authOperations.getSavedPassword,
    authOperations.signOut,
    authOperations.fetchCurrentUser,
    authOperations.updateUserEmail, // коли user авторизований і хоче змінити поточну пошту
    authOperations.updateUserPassword, // коли user авторизований і хоче змінити поточний пароль
    authOperations.recoveryPasswordRequest,
    authOperations.recoveryPasswordChange, // при forgotPassword, коли user забув пароль і йому треба змінити його
    authOperations.googleAuth,
    authOperations.googleBind,
    authOperations.googleUnbind,
    authOperations.facebookAuth,
    authOperations.appleAuth,
  ];
  return extraActions?.map((action) => action[type]);
};
