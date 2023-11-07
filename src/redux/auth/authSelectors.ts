import { RootState } from 'redux/store';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectHasError = (state: RootState) => state.auth.hasError;
export const selectCurrentUser = (state: RootState) => state.auth.isCurrentUser;
export const selectUserTheme = (state: RootState) => state.auth.userTheme;
