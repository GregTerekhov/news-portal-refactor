import { RootState } from 'reduxStore/store';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectHasAuthError = (state: RootState) => state.auth.hasError;
export const selectCurrentUser = (state: RootState) => state.auth.isCurrentUser;
export const selectUserTheme = (state: RootState) => state.auth.userTheme;
// export const selectBoundAccounts = (state: RootState) => state.auth.haveAccounts;
