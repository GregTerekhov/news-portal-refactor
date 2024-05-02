import type { FieldErrors } from 'react-hook-form';
import type {
  AuthInputs,
  AuthRequestWithoutName,
  ChangePasswordValues,
  MainCredentials,
} from 'types';

export const signInDataInputs = (
  errors: FieldErrors<AuthRequestWithoutName>,
  email: string,
  password: string,
  isChecked: boolean,
) => {
  const data: Array<AuthInputs> = [
    {
      type: 'email',
      placeholder: 'Enter your email',
      labelName: 'Email',
      fieldValue: email,
      errors: errors?.email?.message,
      label: 'email',
      ariaInvalid: errors?.email ? true : false,
      autoFocus: true,
      autofill: 'email',
      disabled: isChecked && email !== '' ? true : false,
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      labelName: 'Password',
      fieldValue: typeof password === 'string' ? password : '',
      errors: errors?.password?.message,
      label: 'password',
      ariaInvalid: errors?.password ? true : false,
      disabled: isChecked && password !== '' ? true : false,
    },
  ];

  return data;
};

export const changePasswordDataInputs = (errors: FieldErrors<ChangePasswordValues>) => {
  const data: Array<AuthInputs> = [
    {
      type: 'password',
      placeholder: 'Enter your new password',
      labelName: 'New Password',
      errors: errors?.newPassword?.message,
      label: 'newPassword',
      ariaInvalid: errors?.newPassword ? true : false,
      autoFocus: true,
    },
    {
      type: 'password',
      placeholder: 'Confirm your password',
      labelName: 'Confirm Password',
      errors: errors?.confirmPassword?.message,
      label: 'confirmPassword',
      ariaInvalid: errors?.confirmPassword ? true : false,
    },
  ];

  return data;
};

export const signUpDataInputs = (errors: FieldErrors<MainCredentials>) => {
  const data: Array<AuthInputs> = [
    {
      type: 'text',
      placeholder: 'Enter your name',
      labelName: 'Name',
      errors: errors?.name?.message,
      label: 'name',
      ariaInvalid: errors?.name ? true : false,
      autoFocus: true,
    },
    {
      type: 'email',
      placeholder: 'Enter your email',
      labelName: 'Email',
      errors: errors?.email?.message,
      label: 'email',
      ariaInvalid: errors?.email ? true : false,
      autofill: 'email',
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      labelName: 'Password',
      errors: errors?.password?.message,
      label: 'password',
      ariaInvalid: errors?.password ? true : false,
    },
  ];

  return data;
};
