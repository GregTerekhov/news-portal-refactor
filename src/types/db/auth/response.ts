import { ThemeValue } from './common';
import { ServicesInfo } from '../common';

export interface User {
  name: string;
  email: string;
  id: string;
}

interface ReceivedCryptoPassword {
  exportedCryptoKey: string;
  encryptedPassword: string;
  salt: string;
  email: string;
}

export interface HaveAccounts {
  google: boolean;
  facebook: boolean;
  apple: boolean;
}

interface SignUpResponse {
  user: Omit<User, 'id'>;
}

interface SignInResponse {
  user: User;
  userTheme: ThemeValue;
  accessToken: string;
  refreshToken: string;
  haveAccounts: HaveAccounts;
}

interface Current {
  user: User;
  userTheme: ThemeValue;
  haveAccounts: HaveAccounts;
  thirdPartyRegister: boolean;
}

interface UpdateCredentials {
  newEmail: string;
}

interface UpdateTheme {
  userTheme: ThemeValue;
}

interface Tokens {
  data: TokensPayload;
}

export interface TokensPayload {
  accessToken: string | null;
  refreshToken: string | null;
}

//GET_DECRYPTED_PASSWORD
export type ResponseCryptoPassword = ServicesInfo & { cryptoData: ReceivedCryptoPassword };

//SIGN_UP
export type CredentialSignUpResponse = ServicesInfo & SignUpResponse;

//SIGN_IN
export type CredentialSignInResponse = ServicesInfo & SignInResponse;

//GOOGLE_AUTH
export type GoogleAuthResponse = CredentialSignInResponse & { thirdPartyRegister: boolean };

//CURRENT_USER
export type CurrentUserResponse = ServicesInfo & Current;

//UPDATE_EMAIL
export type UpdateCredentialsResponse = ServicesInfo & UpdateCredentials;

//UPDATE_THEME
export type UpdateThemeResponse = ServicesInfo & UpdateTheme;

//FORGOT_PASSWORD_CHANGE
export type PasswordChangeResponse = ServicesInfo & SignInResponse;

//GOOGLE_BIND
export type BindSocialsResponse = ServicesInfo & HaveAccounts;

//REFRESH
export type RefreshTokensResponse = ServicesInfo & Tokens;
