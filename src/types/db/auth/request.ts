import { ThemeValue } from './common';

export interface EncryptedPassword {
  exportedCryptoKey: string;
  encryptedPassword: string;
  salt: string;
}

export type SendEncryptedPassword = EncryptedPassword & GetCryptoPassword;

export type EncryptedPasswordRequest = AuthRequestWithoutName & {
  cryptoData: SendEncryptedPassword;
};

interface AdditionalCredentials {
  newPassword: string;
  updatedTheme: ThemeValue;
}

export type ExtendedUpdatePassword = UpdatePasswordRequest & {
  confirmPassword: string;
};

export type ChangePasswordValues = Omit<ExtendedUpdatePassword, 'password'>;

//SIGN_UP
export interface MainCredentials {
  name: string;
  email: string;
  password: string;
}

//GET_SAVED_CREDENTIALS
export interface GetCryptoPassword {
  userId: string;
}

//SIGN_IN
export type SignInRequest = AuthRequestWithoutName | EncryptedPasswordRequest;

//UPDATE_PASSWORD
export interface UpdatePasswordRequest {
  password: string;
  newPassword: string;
}

//GOOGLE_AUTH
export type GoogleAuth = SendEmailRequest & { sub: string };

//UPDATE_EMAIL
export type AuthRequestWithoutName = Omit<MainCredentials, 'name'>;

//FORGOT_PASSWORD_REQUEST & GOOGLE_BIND
export type SendEmailRequest = Pick<MainCredentials, 'email'>;

//FORGOT_PASSWORD_CHANGE
export type RecoveryPasswordChange = Required<Pick<AdditionalCredentials, 'newPassword'>>;

//UPDATE_THEME
export type UpdateThemeRequest = Required<Pick<AdditionalCredentials, 'updatedTheme'>>;
