import { PayloadAction, createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import * as authOperations from './authOperations';
import { ThemeValue, TokensPayload } from 'types';

export type KnownError = {
  message: string | undefined;
  code: number | undefined;
};

interface AuthState {
  message: string;
  isLoggedIn: boolean;
  hasError: KnownError | null;
  isCurrentUser: boolean;
  userTheme: string;
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    name: string;
    email: string;
    id: string;
  };
  haveAccounts: {
    google: boolean;
    facebook: boolean;
    apple: boolean;
  };
}

type Theme = { updatedTheme: ThemeValue };

const initialState: AuthState = {
  message: '',
  isLoggedIn: false,
  hasError: null,
  isCurrentUser: false,
  userTheme: 'light',
  accessToken: null,
  refreshToken: null,
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

const handlePending = (state: AuthState) => {
  state.isCurrentUser = true;
  state.hasError = null;
};

const handleFulfilled = (state: AuthState) => {
  state.isCurrentUser = false;
  state.hasError = null;
};

const handleRejected = (state: AuthState, action: PayloadAction<unknown, string, any>) => {
  state.isCurrentUser = false;
  if (action.payload) {
    const payload = action.payload as {
      status?: number;
      data?: {
        message?: string;
      };
    };
    state.hasError = {
      code: payload.status,
      message: payload.data?.message,
    };
    console.log('authSignUpError', state.hasError);
  }
};

const getActions = (type: 'pending' | 'fulfilled' | 'rejected') => {
  const extraActions = [
    authOperations.signUp,
    authOperations.signIn,
    authOperations.signOut,
    authOperations.fetchCurrentUser,
    authOperations.updateUserEmail,
    authOperations.updateUserPassword,
    authOperations.googleAuth,
    authOperations.facebookAuth,
    authOperations.appleAuth,
    authOperations.updateTheme,
  ];
  return extraActions?.map((action) => action[type]);
};

export const setTokens = createAction<TokensPayload>('auth/setTokens');
export const changeNotAuthTheme = createAction<Theme>('auth/changeTheme');

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
        state.message = action.payload.message;
      })
      .addCase(authOperations.signIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.userTheme = action.payload.userTheme;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.message = action.payload.message;
      })
      .addCase(authOperations.signOut.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(authOperations.fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.userTheme = action.payload.userTheme;
        state.isCurrentUser = false;
        state.hasError = null;
      })
      .addCase(authOperations.updateUserEmail.fulfilled, (state, action) => {
        state.user.email = action.payload.newEmail;
        state.message = action.payload.message;
      })
      .addCase(authOperations.updateUserPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(authOperations.googleAuth.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.haveAccounts.google = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.message = action.payload.message;
      })
      .addCase(authOperations.facebookAuth.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.haveAccounts.facebook = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.message = action.payload.message;
      })
      .addCase(authOperations.appleAuth.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.haveAccounts.apple = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.message = action.payload.message;
      })
      .addCase(authOperations.updateTheme.fulfilled, (state, action) => {
        state.userTheme = action.payload.userTheme;
        state.message = action.payload.message;
      })
      .addCase(setTokens, (state, action) => {
        const { accessToken, refreshToken } = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(changeNotAuthTheme, (state, action) => {
        const { updatedTheme }: Theme = action.payload;
        state.userTheme = updatedTheme;
      })
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected);
  },
});

export const authSliceReducer = authSlice.reducer;
