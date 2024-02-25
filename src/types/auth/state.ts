import { ThemeValue } from './requests';

type KnownError = {
  message: string | undefined;
};

export interface AuthState {
  message: string;
  isLoggedIn: boolean;
  hasError: KnownError | null;
  isCurrentUser: boolean;
  userTheme: ThemeValue;
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    name: string;
    email: string;
    id: string;
  };
  haveAccounts: {
    google: boolean;
    facebook: boolean;
    apple: boolean;
  };
}
