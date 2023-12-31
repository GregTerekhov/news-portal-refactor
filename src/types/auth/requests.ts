type ThemeValue = 'light' | 'dark';

type MainCredentials = {
  name: string;
  email: string;
  password: string;
};

type AdditionalCredentials = {
  newPassword: string;
  updatedTheme: ThemeValue;
};

export type UpdatePasswordRequest = {
  password: string;
  newPassword: string;
};

export type SignUpRequest = Required<MainCredentials>;
export type AuthRequestWithoutName = Required<Omit<MainCredentials, 'name'>>;
export type RecoveryPasswordRequest = Required<Pick<MainCredentials, 'email'>>;
export type RecoveryPasswordChange = Required<Pick<AdditionalCredentials, 'newPassword'>>;
export type UpdateThemeRequest = Required<Pick<AdditionalCredentials, 'updatedTheme'>>;
