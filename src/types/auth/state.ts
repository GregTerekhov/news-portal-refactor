import { ThemeValue } from './requests';

export interface AuthState {
  message: string;
  isLoggedIn: boolean;
  hasError: string | null;
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
