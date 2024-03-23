import { ThemeValue } from './requests';

export interface AuthState {
  message: string;
  isLoggedIn: boolean;
  hasError: string | number | null;
  isCurrentUser: boolean;
  userTheme: ThemeValue;
  accessToken: string | null;
  refreshToken: string | null;
  // thirdPartyRegister: boolean,
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
