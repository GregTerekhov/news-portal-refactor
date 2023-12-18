type User = {
  name: string;
  email: string;
  id: string;
};

type ThemeValue = 'light' | 'dark';

export type TokensPayload = {
  accessToken: string | null;
  refreshToken: string | null;
};

export interface CredentialSignUpResponse {
  code: number;
  message: string;
  user: Omit<User, 'id'>;
}

export interface CredentialSignInResponse {
  code: number;
  message: string;
  user: User;
  userTheme: ThemeValue;
  accessToken: string;
  refreshToken: string;
}

export interface SignOutResponse {
  code: number;
  message: string;
}

export interface CurrentUserResponse {
  code: number;
  message: string;
  user: User;
  userTheme: ThemeValue;
}

export interface UpdateCredentialsResponse {
  code: number;
  message: string;
  newEmail: string;
}

export type UpdatePasswordResponse = Omit<UpdateCredentialsResponse, 'newEmail'>;

export interface UpdateThemeResponse {
  code: number;
  message: string;
  userTheme: ThemeValue;
}

export interface RefreshTokensResponse {
  code: number;
  message: string;
  data: TokensPayload;
}
