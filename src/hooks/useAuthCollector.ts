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
// import { AuthCredentials } from 'types';
import { useAppDispatch, useAppSelector } from 'reduxStore/hooks';

const useAuthCollector = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const isCurrentUser = useAppSelector(selectCurrentUser);
  const userTheme = useAppSelector(selectUserTheme);
  const authError = useAppSelector(selectHasAuthError);

  const dispatch = useAppDispatch();

  // const register = dispatch(signUp(credentials): AuthCredentials);
  // const login = dispatch(signIn(credentials): AuthCredentials);
  const logout = dispatch(signOut());
  const fetchCurrentAuthUser = dispatch(fetchCurrentUser());

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
