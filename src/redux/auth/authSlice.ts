import {
  // PayloadAction,
  SerializedError,
  createAction,
  createSlice,
  // isAnyOf,
} from '@reduxjs/toolkit';

import * as authOperations from './authOperations';

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

type Theme = { updatedTheme: string };

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
  haveAccounts: {
    google: false,
    facebook: false,
    apple: false,
  },
};

// const handlePending = (state: AuthState) => {
//   state.isCurrentUser = true;
//   state.hasError = null;
// };

// const handleFulfilled = (state: AuthState) => {
//   state.isCurrentUser = false;
//   state.hasError = null;
// };

// const handleRejected = (state: AuthState, action: PayloadAction<unknown, string, any>) => {
//   state.isCurrentUser = false;
//   state.hasError = action.payload ?? null;
// };

export const setTokens = createAction<SetTokensPayload>('auth/setTokens');
export const changeNotAuthTheme = createAction<Theme>('auth/changeTheme');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authOperations.signUp.pending, (state) => {
        state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(authOperations.signUp.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        const { name, email } = action.payload;
        state.user.name = name;
        state.user.email = email;
      })
      .addCase(authOperations.signUp.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(authOperations.signIn.pending, (state) => {
        state.isCurrentUser = true;
        state.isLoggedIn = false;
        state.hasError = null;
      })
      .addCase(authOperations.signIn.fulfilled, (state, action) => {
        state.isCurrentUser = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.userTheme = action.payload.userTheme;
      })
      .addCase(authOperations.signIn.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.isLoggedIn = false;
        state.hasError = action.error;
      })
      .addCase(authOperations.signOut.pending, (state) => {
        state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(authOperations.signOut.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(authOperations.signOut.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(authOperations.fetchCurrentUser.pending, (state) => {
        state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(authOperations.fetchCurrentUser.fulfilled, (state, action) => {
        state.isCurrentUser = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.userTheme = action.payload.userTheme;
        state.hasError = null;
        if (action.payload) {
          console.log('action.payload.user', action.payload.user);
        }
      })
      .addCase(authOperations.fetchCurrentUser.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(authOperations.updateUserEmail.pending, (state) => {
        state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(authOperations.updateUserEmail.fulfilled, (state, action) => {
        state.user.email = action.payload.newEmail;
        state.isCurrentUser = false;
        state.hasError = null;
      })
      .addCase(authOperations.updateUserEmail.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(authOperations.googleAuth.pending, (state) => {
        state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(authOperations.googleAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isLoggedIn = true;
        state.haveAccounts.google = true;
        state.isCurrentUser = false;
        state.hasError = null;
      })
      .addCase(authOperations.googleAuth.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(authOperations.facebookAuth.pending, (state) => {
        state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(authOperations.facebookAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.haveAccounts.facebook = true;
        state.isCurrentUser = false;
        state.hasError = null;
      })
      .addCase(authOperations.facebookAuth.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(authOperations.appleAuth.pending, (state) => {
        state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(authOperations.appleAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.haveAccounts.apple = true;
        state.isCurrentUser = false;
        state.hasError = null;
      })
      .addCase(authOperations.appleAuth.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(authOperations.updateTheme.pending, (state) => {
        state.isCurrentUser = true;
        state.hasError = null;
      })
      .addCase(authOperations.updateTheme.fulfilled, (state, action) => {
        state.userTheme = action.payload.userTheme;
        state.isCurrentUser = false;
        state.hasError = null;
      })
      .addCase(authOperations.updateTheme.rejected, (state, action) => {
        state.isCurrentUser = false;
        state.hasError = action.error;
      })
      .addCase(setTokens, (state, action) => {
        const { accessToken, refreshToken }: SetTokensPayload = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(changeNotAuthTheme, (state, action) => {
        const { updatedTheme }: Theme = action.payload;
        state.userTheme = updatedTheme;
      });
    // .addMatcher(isAnyOf(...getActions('pending')), handlePending)
    // .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
    // .addMatcher(isAnyOf(...getActions('rejected')), handleRejected);
  },
});

// const extraActions = [
//   authOperations.signUp,
//   authOperations.signIn,
//   authOperations.signOut,
//   authOperations.fetchCurrentUser,
//   authOperations.updateUserEmail,
//   authOperations.googleAuth,
//   authOperations.facebookAuth,
//   authOperations.appleAuth,
//   authOperations.updateTheme,
// ];

// const getActions = (type: 'pending' | 'fulfilled' | 'rejected') =>
//   extraActions ? extraActions?.map((action) => action[type]) : [];

export const authSliceReducer = authSlice.reducer;
