import { SerializedError, createAction, createSlice } from '@reduxjs/toolkit';

import {
  appleAuth,
  facebookAuth,
  fetchCurrentUser,
  googleAuth,
  signIn,
  signOut,
  signUp,
  updateTheme,
  updateUserEmail,
} from './authOperations';

interface AuthState {
  isLoggedIn: boolean;
  hasError: SerializedError | null;
  isCurrentUser: boolean;
  userTheme: string;
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    name: string;
    email: string;
    id: string;
    // rememberMe: boolean;
  };
  // haveAccounts: {
  //   google: boolean;
  //   facebook: boolean;
  //   apple: boolean;
  // };
}

interface SetTokensPayload {
  accessToken: string | null;
  refreshToken: string | null;
}

type Theme = { theme: string };

const initialState: AuthState = {
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
    // rememberMe: false,
  },
  // haveAccounts: {
  //   google: false,
  //   facebook: false,
  //   apple: false,
  // },
};

export const setTokens = createAction<SetTokensPayload>('auth/setTokens');
export const changeNotAuthTheme = createAction<Theme>('auth/changeTheme');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setTokens: (state: AuthState, action: PayloadAction<SetTokensPayload>) => {
    //   state.accessToken = action.payload.accessToken;
    //   state.refreshToken = action.payload.refreshToken;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        // state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        // state.isCurrentUser = false;
        state.user = action.payload.user;
        state.hasError = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        // state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(signIn.pending, (state) => {
        // state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        // state.isCurrentUser = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.userTheme = action.payload.userTheme;
        state.hasError = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        // state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(signOut.pending, (state) => {
        // state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(signOut.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(signOut.rejected, (state, action) => {
        // state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isCurrentUser = true;
        state.hasError = null;
        // console.log('CYR', state.refreshToken);
        // console.log('ACT', action);
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isCurrentUser = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.userTheme = action.payload.userTheme;
        state.hasError = null;
        if (action.payload) {
          console.log('action.payload.user', action.payload.user);
        }
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(updateUserEmail.pending, (state) => {
        state.isCurrentUser = true;
      })
      .addCase(updateUserEmail.fulfilled, (state, action) => {
        state.isCurrentUser = false;
        state.user.email = action.payload.newEmail;
      })
      .addCase(updateUserEmail.rejected, (state, action) => {
        state.hasError = action.error;
        state.isCurrentUser = false;
      })
      .addCase(googleAuth.pending, (state) => {
        state.isCurrentUser = true;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.isCurrentUser = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isLoggedIn = true;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.hasError = action.error;
        state.isCurrentUser = false;
      })
      .addCase(facebookAuth.pending, (state) => {
        state.isCurrentUser = true;
      })
      .addCase(facebookAuth.fulfilled, (state, action) => {
        state.isCurrentUser = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(facebookAuth.rejected, (state, action) => {
        state.hasError = action.error;
        state.isCurrentUser = false;
      })
      .addCase(appleAuth.pending, (state) => {
        state.isCurrentUser = true;
      })
      .addCase(appleAuth.fulfilled, (state, action) => {
        state.isCurrentUser = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(appleAuth.rejected, (state, action) => {
        state.hasError = action.error;
        state.isCurrentUser = false;
      })
      .addCase(updateTheme.pending, (state) => {
        state.isCurrentUser = true;
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.isCurrentUser = false;
        state.userTheme = action.payload;
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.hasError = action.error;
        state.isCurrentUser = false;
      })
      .addCase(setTokens, (state, action) => {
        const { accessToken, refreshToken }: SetTokensPayload = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(changeNotAuthTheme, (state, action) => {
        const { theme }: Theme = action.payload;
        state.userTheme = theme;
      });
  },
});

export const authSliceReducer = authSlice.reducer;
