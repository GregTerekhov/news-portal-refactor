import { SerializedError, createSlice } from '@reduxjs/toolkit';
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
  };
}

const initialState = {
  isLoggedIn: false,
  hasError: null,
  isCurrentUser: false,
  userTheme: 'light',
  accessToken: null,
  refreshToken: null,
  user: {
    name: '',
    email: '',
  },
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      });
  },
});

export default authSlice.reducer;
