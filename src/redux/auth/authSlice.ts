import { createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import type { AuthState, TokensPayload, UpdateThemeRequest } from 'types';

import * as authOperations from './authOperations';
import { getActions, handleFulfilled, handlePending, handleRejected } from './handleFunctions';

const initialState: AuthState = {
  message: '',
  isLoggedIn: false,
  hasError: null,
  isCurrentUser: false,
  userTheme: 'light',
  accessToken: null,
  refreshToken: null,
  thirdPartyRegister: false,
  user: {
    name: '',
    email: '',
    id: '',
  },
  haveAccounts: {
    google: false,
    facebook: false,
    apple: false,
  },
};

export const setTokens = createAction<TokensPayload>('auth/setTokens');
export const changeNotAuthTheme = createAction<UpdateThemeRequest>('notAuth/changeTheme');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authOperations.signUp.fulfilled, (state, { payload }) => {
        const { name, email } = payload.user;
        state.user.name = name;
        state.user.email = email;
      })
      .addCase(authOperations.getSavedPassword.fulfilled, (state, { payload }) => {
        state.message = payload.message;
      })
      .addCase(authOperations.signIn.fulfilled, (state, { payload }) => {
        const { user, userTheme, accessToken, refreshToken, haveAccounts } = payload;

        state.isLoggedIn = true;
        state.user = user;
        state.userTheme = userTheme;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.haveAccounts = haveAccounts;
      })
      .addCase(authOperations.signOut.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(authOperations.fetchCurrentUser.fulfilled, (state, { payload }) => {
        const { user, userTheme, haveAccounts, thirdPartyRegister } = payload;

        state.isLoggedIn = true;
        state.user = user;
        state.userTheme = userTheme;
        state.haveAccounts = haveAccounts;
        state.thirdPartyRegister = thirdPartyRegister;
      })
      .addCase(authOperations.updateUserEmail.fulfilled, (state, { payload }) => {
        const { newEmail } = payload;
        state.user.email = newEmail;
      })
      .addCase(authOperations.recoveryPasswordChange.fulfilled, (state, { payload }) => {
        const { user, userTheme, accessToken, refreshToken, haveAccounts } = payload;

        state.isLoggedIn = true;
        state.user = user;
        state.userTheme = userTheme;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.haveAccounts = haveAccounts;
      })
      .addCase(authOperations.googleAuth.fulfilled, (state, { payload }) => {
        const { user, userTheme, accessToken, refreshToken, thirdPartyRegister, haveAccounts } =
          payload;

        state.isLoggedIn = true;
        state.user = user;
        state.userTheme = userTheme;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.thirdPartyRegister = thirdPartyRegister;
        if (haveAccounts) state.haveAccounts = haveAccounts;
      })
      .addCase(authOperations.googleBind.fulfilled, (state) => {
        state.haveAccounts.google = true;
      })
      .addCase(authOperations.googleUnbind.fulfilled, (state) => {
        state.haveAccounts.google = false;
      })
      .addCase(authOperations.updateTheme.fulfilled, (state, { payload }) => {
        const { userTheme } = payload;
        state.userTheme = userTheme;
      })
      .addCase(setTokens, (state, { payload }) => {
        const { accessToken, refreshToken } = payload;

        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(changeNotAuthTheme, (state, { payload }) => {
        const { updatedTheme }: UpdateThemeRequest = payload;
        state.userTheme = updatedTheme;
      })
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected);
  },
});

export const authReducer = authSlice.reducer;
