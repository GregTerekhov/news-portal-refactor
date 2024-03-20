import { createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { AuthState, TokensPayload, UpdateThemeRequest } from 'types';

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
  // thirdPartyRegister: false,
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
      .addCase(authOperations.signUp.fulfilled, (state, action) => {
        const { name, email } = action.payload.user;
        state.user.name = name;
        state.user.email = email;
      })
      .addCase(authOperations.signIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.userTheme = action.payload.userTheme;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.haveAccounts = action.payload.haveAccounts;
      })
      .addCase(authOperations.signOut.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(authOperations.fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.userTheme = action.payload.userTheme;
        state.haveAccounts = action.payload.haveAccounts;
        // if(action.payload.thirdPartyRegister)  state.thirdPartyRegister = true;
      })
      .addCase(authOperations.updateUserEmail.fulfilled, (state, action) => {
        state.user.email = action.payload.newEmail;
      })
      .addCase(authOperations.recoveryPasswordChange.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.userTheme = action.payload.userTheme;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.haveAccounts = action.payload.haveAccounts;
      })
      .addCase(authOperations.googleAuth.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.userTheme = action.payload.userTheme;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        // state.thirdPartyRegister = true;
      })
      .addCase(authOperations.googleBind.fulfilled, (state) => {
        state.haveAccounts.google = true;
      })
      .addCase(authOperations.googleUnbind.fulfilled, (state) => {
        state.haveAccounts.google = false;
      })
      .addCase(authOperations.facebookAuth.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.haveAccounts.facebook = true;
        state.user = action.payload.user;
        state.userTheme = action.payload.userTheme;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        // state.thirdPartyRegister = true;
      })
      .addCase(authOperations.appleAuth.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.haveAccounts.apple = true;
        state.user = action.payload.user;
        state.userTheme = action.payload.userTheme;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        // state.thirdPartyRegister = true;
      })
      .addCase(authOperations.updateTheme.fulfilled, (state, action) => {
        state.userTheme = action.payload.userTheme;
      })
      .addCase(setTokens, (state, action) => {
        const { accessToken, refreshToken } = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(changeNotAuthTheme, (state, action) => {
        const { updatedTheme }: UpdateThemeRequest = action.payload;
        state.userTheme = updatedTheme;
      })
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected);
  },
});

export const authReducer = authSlice.reducer;
