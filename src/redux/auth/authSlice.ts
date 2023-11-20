import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';

import { fetchCurrentUser, signIn, signOut, signUp } from './authOperations';

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
    rememberMe: boolean;
  };
  haveAccounts: {
    google: boolean;
    facebook: boolean;
    apple: boolean;
  };
}

interface SetTokensPayload {
  accessToken: string | null;
  refreshToken: string | null;
}

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
    rememberMe: false,
  },
  haveAccounts: {
    google: false,
    facebook: false,
    apple: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state: AuthState, action: PayloadAction<SetTokensPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.isCurrentUser = false;
        state.user = action.payload.user;
        state.hasError = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(signIn.pending, (state) => {
        state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isCurrentUser = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.userTheme = action.payload.userTheme;
        state.hasError = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(signOut.pending, (state) => {
        state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(signOut.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isCurrentUser = false;
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
        state.hasError = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      });
  },
});

export const { setTokens } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
