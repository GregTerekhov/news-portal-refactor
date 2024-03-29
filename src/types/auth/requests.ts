export type ThemeValue = 'light' | 'dark';

export type MainCredentials = {
  name: string;
  email: string;
  password: string;
};

export interface EncryptedPassword {
  encryptedPassword: ArrayBuffer;
  salt: Uint8Array;
}

export interface GetCryptoPassword {
  userId: string;
}

export type SendEncryptedPassword = EncryptedPassword & GetCryptoPassword;

export type EncryptedPasswordRequest = SendEmailRequest & { password: SendEncryptedPassword };

export type SignInRequest = AuthRequestWithoutName | EncryptedPasswordRequest;

type AdditionalCredentials = {
  newPassword: string;
  updatedTheme: ThemeValue;
};

export type UpdatePasswordRequest = {
  password: string;
  newPassword: string;
};

export type ExtendedUpdatePasswordRequest = UpdatePasswordRequest & {
  confirmPassword: string;
};

export interface IThirdPartyAuth {
  // треба видалити, або змінити, коли буде зроблена автентифікація через facebook та apple
  tokenAuth: string | null;
}

export type GoogleAuth = SendEmailRequest & { sub: string };

export type AuthRequestWithoutName = Omit<MainCredentials, 'name'>;
export type SendEmailRequest = Pick<MainCredentials, 'email'>;
export type RecoveryPasswordChange = Required<Pick<AdditionalCredentials, 'newPassword'>>;
export type ChangePasswordValues = Omit<ExtendedUpdatePasswordRequest, 'password'>;
export type UpdateThemeRequest = Required<Pick<AdditionalCredentials, 'updatedTheme'>>;

export type VerifiableInputValues =
  | ChangePasswordValues
  | ExtendedUpdatePasswordRequest
  | MainCredentials
  | AuthRequestWithoutName
  | SendEmailRequest;
