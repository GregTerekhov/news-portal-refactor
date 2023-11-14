import { useCallback } from 'react';
import {
  fetchCurrentUser,
  selectCurrentUser,
  selectHasAuthError,
  selectIsLoggedIn,
  selectUser,
  selectUserTheme,
  //   signIn,
  signOut,
  //   signUp,
} from 'reduxStore/auth';
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';
// import { AuthCredentials } from 'types';

const useAuthCollector = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const isCurrentUser = useAppSelector(selectCurrentUser);
  const userTheme = useAppSelector(selectUserTheme);
  const authError = useAppSelector(selectHasAuthError);

  const dispatch = useAppDispatch();

  // const register = dispatch(signUp(credentials): AuthCredentials);
  // const login = dispatch(signIn(credentials): AuthCredentials);
  const logout = useCallback(() => dispatch(signOut()), [dispatch]);
  const fetchCurrentAuthUser = useCallback(() => dispatch(fetchCurrentUser()), [dispatch]);

  return {
    isLoggedIn,
    user,
    isCurrentUser,
    userTheme,
    authError,
    logout,
    fetchCurrentAuthUser,
  };
};

export default useAuthCollector;
