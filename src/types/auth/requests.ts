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
  password: Pick<MainCredentials, 'password'>;
  newPassword: Pick<AdditionalCredentials, 'newPassword'>;
};
export type SignUpRequest = Required<MainCredentials>;
export type AuthRequestWithoutName = Required<Omit<MainCredentials, 'name'>>;
export type UpdateThemeRequest = Required<Omit<AdditionalCredentials, 'newPassword'>>;
