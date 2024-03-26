import { useCallback } from 'react';

import * as auth from '../auth';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import type {
  MainCredentials,
  AuthRequestWithoutName,
  IThirdPartyAuth,
  UpdateThemeRequest,
  TokensPayload,
  SendEmailRequest,
  UpdatePasswordRequest,
  RecoveryPasswordChange,
  GoogleAuth,
  // SendEncryptedPassword,
  GetCryptoPassword,
  SignInRequest,
} from 'types';

const useAuthCollector = () => {
  const isAuthenticated = useAppSelector(auth.selectIsLoggedIn);
  const user = useAppSelector(auth.selectUser);
  const savedCredentials = useAppSelector(auth.selectCredentials);
  const isRefreshingUser = useAppSelector(auth.selectCurrentUser);
  const userTheme = useAppSelector(auth.selectUserTheme);
  const authError = useAppSelector(auth.selectHasAuthError);
  const haveAccounts = useAppSelector(auth.selectBoundAccounts);
  const statusMessage = useAppSelector(auth.selectStatusMessage);

  const dispatch = useAppDispatch();

  const register = useCallback(
    (credentials: MainCredentials) => dispatch(auth.signUp(credentials)),
    [dispatch],
  );
  const login = useCallback(
    (credentials: SignInRequest) => dispatch(auth.signIn(credentials)),
    [dispatch],
  );
  // const sendPassword = useCallback(
  //   (cryptoData: SendEncryptedPassword) => dispatch(auth.sendCryptoPassword(cryptoData)),
  //   [dispatch],
  // );
  const getCryptoPassword = useCallback(
    (userId: GetCryptoPassword) => dispatch(auth.getSavedPassword(userId)),
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
    (email: SendEmailRequest) => dispatch(auth.recoveryPasswordRequest(email)),
    [dispatch],
  );

  const changePassword = useCallback(
    (newPassword: RecoveryPasswordChange) => dispatch(auth.recoveryPasswordChange(newPassword)),
    [dispatch],
  );

  const enterWithGoogle = useCallback(
    (credentials: GoogleAuth) => dispatch(auth.googleAuth(credentials)),
    [dispatch],
  );

  const bindGoogle = useCallback(
    (email: SendEmailRequest) => dispatch(auth.googleBind(email)),
    [dispatch],
  );

  const unbindGoogle = useCallback(() => dispatch(auth.googleUnbind()), [dispatch]);

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
    statusMessage,
    haveAccounts,
    isAuthenticated,
    user,
    savedCredentials,
    isRefreshingUser,
    userTheme,
    authError,
    register,
    login,
    // sendPassword,
    getCryptoPassword,
    logout,
    fetchCurrentAuthUser,
    updateEmail,
    updatePassword,
    sendEmailForRecovery,
    changePassword,
    enterWithGoogle,
    bindGoogle,
    unbindGoogle,
    enterWithFacebook,
    enterWithApple,
    changeTheme,
    unauthorisedChangeTheme,
    writeTokens,
  };
};

export default useAuthCollector;
