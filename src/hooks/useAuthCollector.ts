import { useCallback } from 'react';

import * as auth from 'reduxStore/auth';
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
import {
  SignUpRequiredFields,
  SignInRequiredFields,
  IUpdateEmail,
  IThirdPartyAuth,
  UpdatePasswordRequiredToSend,
  RecoveryPasswordRequestRequired,
  RecoveryPasswordChangeRequiredToSend,
  ITheme,
  SetTokensPayload,
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
    (credentials: SignUpRequiredFields) => dispatch(auth.signUp(credentials)),
    [dispatch],
  );
  const login = useCallback(
    (credentials: SignInRequiredFields) => dispatch(auth.signIn(credentials)),
    [dispatch],
  );
  const logout = useCallback(() => dispatch(auth.signOut()), [dispatch]);
  const fetchCurrentAuthUser = useCallback(() => dispatch(auth.fetchCurrentUser()), [dispatch]);
  const updateEmail = useCallback(
    (newEmail: IUpdateEmail) => dispatch(auth.updateUserEmail(newEmail)),
    [dispatch],
  );

  const updatePassword = useCallback(
    (newPassword: UpdatePasswordRequiredToSend) => dispatch(auth.updateUserPassword(newPassword)),
    [dispatch],
  );

  const sendEmailForRecovery = useCallback(
    (email: RecoveryPasswordRequestRequired) => dispatch(auth.recoveryPasswordRequest(email)),
    [dispatch],
  );

  const changePassword = useCallback(
    (changedPassword: RecoveryPasswordChangeRequiredToSend) =>
      dispatch(auth.recoveryPasswordChange(changedPassword)),
    [dispatch],
  );

  const enterWithGoogle = useCallback(
    (tokenAuth: IThirdPartyAuth) => dispatch(auth.googleAuth(tokenAuth)),
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
    (updatedTheme: ITheme) => dispatch(auth.changeNotAuthTheme(updatedTheme)),
    [dispatch],
  );
  const writeTokens = useCallback(
    (tokens: SetTokensPayload) => dispatch(auth.setTokens(tokens)),
    [dispatch],
  );

  const changeTheme = useCallback(
    (updatedTheme: ITheme) => dispatch(auth.updateTheme(updatedTheme)),
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
