import { useCallback } from 'react';

import * as auth from 'reduxStore/auth';
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks/hooks';
import {
  SignUpRequest,
  AuthRequestWithoutName,
  IThirdPartyAuth,
  UpdateThemeRequest,
  GoogleResponse,
  TokensPayload,
  RecoveryPasswordRequest,
  UpdatePasswordRequest,
  RecoveryPasswordChange,
} from 'types';

const useAuthCollector = () => {
  const isAuthenticated = useAppSelector(auth.selectIsLoggedIn);
  const user = useAppSelector(auth.selectUser);
  const isRefreshingUser = useAppSelector(auth.selectCurrentUser);
  const userTheme = useAppSelector(auth.selectUserTheme);
  const authError = useAppSelector(auth.selectHasAuthError);
  // const haveAccounts = useAppSelector(selectBoundAccounts);

  const dispatch = useAppDispatch();

  const register = useCallback(
    (credentials: SignUpRequest) => dispatch(auth.signUp(credentials)),
    [dispatch],
  );
  const login = useCallback(
    (credentials: AuthRequestWithoutName) => dispatch(auth.signIn(credentials)),
    [dispatch],
  );
  const logout = useCallback(() => dispatch(auth.signOut()), [dispatch]);
  const fetchCurrentAuthUser = useCallback(() => dispatch(auth.fetchCurrentUser()), [dispatch]);
  const updateEmail = useCallback(
    (email: AuthRequestWithoutName) => dispatch(auth.updateUserEmail(email)),
    [dispatch],
  );

  const updatePassword = useCallback(
    (newPassword: UpdatePasswordRequest) => dispatch(auth.updateUserPassword(newPassword)),
    [dispatch],
  );

  const sendEmailForRecovery = useCallback(
    (email: RecoveryPasswordRequest) => dispatch(auth.recoveryPasswordRequest(email)),
    [dispatch],
  );

  const changePassword = useCallback(
    (newPassword: RecoveryPasswordChange) => dispatch(auth.recoveryPasswordChange(newPassword)),
    [dispatch],
  );

  const enterWithGoogle = useCallback(
    (tokenAuth: GoogleResponse) => dispatch(auth.googleAuth(tokenAuth)),
    [dispatch],
  );

  const enterWithFacebook = useCallback(
    (tokenAuth: IThirdPartyAuth) => dispatch(auth.facebookAuth(tokenAuth)),
    [dispatch],
  );

  const enterWithApple = useCallback(
    (tokenAuth: IThirdPartyAuth) => dispatch(auth.appleAuth(tokenAuth)),
    [dispatch],
  );
  const unauthorisedChangeTheme = useCallback(
    (updatedTheme: UpdateThemeRequest) => dispatch(auth.changeNotAuthTheme(updatedTheme)),
    [dispatch],
  );
  const writeTokens = useCallback(
    (tokens: TokensPayload) => dispatch(auth.setTokens(tokens)),
    [dispatch],
  );

  const changeTheme = useCallback(
    (updatedTheme: UpdateThemeRequest) => dispatch(auth.updateTheme(updatedTheme)),
    [dispatch],
  );

  return {
    // haveAccounts,
    isAuthenticated,
    user,
    isRefreshingUser,
    userTheme,
    authError,
    register,
    login,
    logout,
    fetchCurrentAuthUser,
    updateEmail,
    updatePassword,
    sendEmailForRecovery,
    changePassword,
    enterWithGoogle,
    enterWithFacebook,
    enterWithApple,
    changeTheme,
    unauthorisedChangeTheme,
    writeTokens,
  };
};

export default useAuthCollector;
