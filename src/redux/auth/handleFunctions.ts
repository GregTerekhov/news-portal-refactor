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
    authOperations.getSavedPassword, // отримання зашифрованого пароля користувача при Remember me
    authOperations.signOut,
    authOperations.fetchCurrentUser,
    authOperations.updateUserEmail, // оновлення потчоної пошти зареєстрованого користувача
    authOperations.updateUserPassword, // оновлення потчоного пароля зареєстрованого користувача
    authOperations.recoveryPasswordRequest, // відправка пошти для відновлення пароля користувача при forgotPassword
    authOperations.recoveryPasswordChange, // заміна пароля користувача при forgotPassword
    authOperations.googleAuth, // реєстрація та авторизація через google-акаунт
    authOperations.googleBind, // прив'язка google-акаунта
    authOperations.googleUnbind, // відв'язка google-акаунта
    authOperations.facebookAuth, // реєстрація та авторизація через facebook-акаунт
    authOperations.appleAuth, // реєстрація та авторизація через apple-акаунт
  ];
  return extraActions?.map((action) => action[type]);
};
