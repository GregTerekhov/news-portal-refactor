import { useCallback } from 'react';
import {
  fetchCurrentUser,
  selectCurrentUser,
  selectHasAuthError,
  selectIsLoggedIn,
  selectUser,
  selectUserTheme,
  signIn,
  signOut,
  signUp,
  updateUserEmail,
  updateUserPassword,
  recoveryPasswordRequest,
  recoveryPasswordChange,
  googleAuth,
  facebookAuth,
  appleAuth,
  // selectBoundAccounts,
} from 'reduxStore/auth';
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
import {
  SignUpCredentials,
  SignInCredentials,
  IUpdateEmail,
  IUpdatePassword,
  IRecoveryPasswordRequest,
  IRecoveryPasswordChange,
  IThirdPartyAuth,
} from 'types';

const useAuthCollector = () => {
  const isAuthenticated = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const isRefreshingUser = useAppSelector(selectCurrentUser);
  const userTheme = useAppSelector(selectUserTheme);
  const authError = useAppSelector(selectHasAuthError);
  // const haveAccounts = useAppSelector(selectBoundAccounts);

  const dispatch = useAppDispatch();

  const register = useCallback(
    (credentials: SignUpCredentials) => dispatch(signUp(credentials)),
    [dispatch],
  );
  const login = useCallback(
    (credentials: SignInCredentials) => dispatch(signIn(credentials)),
    [dispatch],
  );
  const logout = useCallback(() => dispatch(signOut()), [dispatch]);
  const fetchCurrentAuthUser = useCallback(() => dispatch(fetchCurrentUser()), [dispatch]);
  const updateEmail = useCallback(
    (newEmail: IUpdateEmail) => dispatch(updateUserEmail(newEmail)),
    [dispatch],
  );

  const updatePassword = useCallback(
    (newPassword: IUpdatePassword) => dispatch(updateUserPassword(newPassword)),
    [dispatch],
  );

  const sendEmailForRecovery = useCallback(
    (email: IRecoveryPasswordRequest) => dispatch(recoveryPasswordRequest(email)),
    [dispatch],
  );

  const changePassword = useCallback(
    (changedPassword: IRecoveryPasswordChange) => dispatch(recoveryPasswordChange(changedPassword)),
    [dispatch],
  );

  const enterWithGoogle = useCallback(
    (tokenAuth: IThirdPartyAuth) => dispatch(googleAuth(tokenAuth)),
    [dispatch],
  );

  const enterWithFacebook = useCallback(
    (tokenAuth: IThirdPartyAuth) => dispatch(facebookAuth(tokenAuth)),
    [dispatch],
  );

  const enterWithApple = useCallback(
    (tokenAuth: IThirdPartyAuth) => dispatch(appleAuth(tokenAuth)),
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
  };
};

export default useAuthCollector;
