import { ThemeValue } from './requests';

export interface ServicesInfo {
  code: number;
  message: string;
}

export type User = {
  name: string;
  email: string;
  id: string;
};

export interface ReceivedCryptoPassword {
  exportedCryptoKey: string;
  encryptedPassword: string;
  salt: string;
  // exportedCryptoKey: ArrayBuffer;
  // encryptedPassword: ArrayBuffer;
  // salt: Uint8Array;
  email: string;
}

export type ResponseCryptoPassword = { cryptoData: ReceivedCryptoPassword } & ServicesInfo;

export type HaveAccounts = {
  google: boolean;
  facebook: boolean;
  apple: boolean;
};

export type TokensPayload = {
  accessToken: string | null;
  refreshToken: string | null;
};

interface SignUpResponse {
  user: Omit<User, 'id'>;
}

export type CredentialSignUpResponse = ServicesInfo & SignUpResponse;

interface SignInResponse {
  user: User;
  userTheme: ThemeValue;
  accessToken: string;
  refreshToken: string;
  haveAccounts: HaveAccounts;
}
export type CredentialSignInResponse = ServicesInfo & SignInResponse;

export type GoogleAuthResponse = CredentialSignInResponse & { thirdPartyRegister: boolean };

export type SignOutResponse = ServicesInfo;

interface Current {
  user: User;
  userTheme: ThemeValue;
  haveAccounts: HaveAccounts;
  thirdPartyRegister: boolean;
}
export type CurrentUserResponse = ServicesInfo & Current;

interface UpdateCredentials {
  newEmail: string;
}

export type UpdateCredentialsResponse = ServicesInfo & UpdateCredentials;

interface UpdateTheme {
  userTheme: ThemeValue;
}
export type UpdateThemeResponse = ServicesInfo & UpdateTheme;

interface Tokens {
  data: TokensPayload;
}

export type PasswordChangeResponse = ServicesInfo & SignInResponse;

export type BindSocialsResponse = ServicesInfo & HaveAccounts;

export type RefreshTokensResponse = ServicesInfo & Tokens;
