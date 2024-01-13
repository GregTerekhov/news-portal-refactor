import { FieldErrors } from 'react-hook-form';

import { InputLabel } from 'types';

export interface IUpdateEmail {
  email: string;
  password: string;
}

export interface IUpdatePassword {
  newPassword: string;
  confirmPassword: string;
  password: string;
}

export type PasswordInputsValues = {
  newPassword: string;
  confirmPassword: string;
  password: string;
  errors?: FieldErrors<Required<IUpdatePassword>>;
};

export type EmailInputsValues = {
  email: string;
  password: string;
  errors?: FieldErrors<Required<IUpdateEmail>>;
};

export type PasswordInput = {
  placeholder: string;
  fieldValue: string;
  errors?: string | undefined;
  label: InputLabel;
  ariaInvalid?: boolean;
};

export type EmailInput = {
  type: string;
  placeholder: string;
  fieldValue: string;
  errors?: string | undefined;
  label: InputLabel;
  iconName: string;
  ariaInvalid?: boolean;
};
