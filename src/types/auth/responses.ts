type User = {
  name: string;
  email: string;
  id: string;
};

type HaveAccounts = {
  google: boolean;
  facebook: boolean;
  apple: boolean;
};

type ThemeValue = 'light' | 'dark';

export interface ServicesInfo {
  code: number;
  message: string;
}

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

export type SignOutResponse = ServicesInfo;

interface Current {
  user: User;
  userTheme: ThemeValue;
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

export type GoogleResponse = {
  access_token: string;
  authuser: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
};
