import type { FieldErrors } from 'react-hook-form';
import {
  CapitalizeInputLabel,
  InputLabel,
  InputType,
  VariantsPlaceholder,
  type AuthInputs,
  type AuthRequestWithoutName,
  type ChangePasswordValues,
  type MainCredentials,
} from 'types';

export const getSignInInputData = (
  errors: FieldErrors<AuthRequestWithoutName>,
  email: string,
  password: string,
  isChecked: boolean,
): AuthInputs[] => {
  return [
    {
      type: InputType.Email,
      placeholder: VariantsPlaceholder.Email,
      labelName: CapitalizeInputLabel.Email,
      fieldValue: email,
      errors: errors?.email?.message,
      label: InputLabel.Email,
      ariaInvalid: errors?.email ? true : false,
      autoFocus: true,
      autofill: 'email',
      disabled: isChecked && !errors?.email?.message && email ? true : false,
    },
    {
      type: InputType.Password,
      placeholder: VariantsPlaceholder.Password,
      labelName: CapitalizeInputLabel.Password,
      fieldValue: typeof password === 'string' ? password : '',
      errors: errors?.password?.message,
      label: InputLabel.Password,
      ariaInvalid: errors?.password ? true : false,
      disabled: isChecked && password !== '' ? true : false,
    },
  ];
};

export const getChangePasswordInputData = (
  errors: FieldErrors<ChangePasswordValues>,
): AuthInputs[] => {
  return [
    {
      type: InputType.Password,
      placeholder: VariantsPlaceholder.NewPassword,
      labelName: CapitalizeInputLabel.NewPassword,
      errors: errors?.newPassword?.message,
      label: InputLabel.NewPassword,
      ariaInvalid: errors?.newPassword ? true : false,
      autoFocus: true,
    },
    {
      type: InputType.Password,
      placeholder: VariantsPlaceholder.ConfirmPassword,
      labelName: CapitalizeInputLabel.ConfirmPassword,
      errors: errors?.confirmPassword?.message,
      label: InputLabel.ConfirmPassword,
      ariaInvalid: errors?.confirmPassword ? true : false,
    },
  ];
};

export const getSignUpInputData = (errors: FieldErrors<MainCredentials>): AuthInputs[] => {
  return [
    {
      type: InputType.Text,
      placeholder: VariantsPlaceholder.Name,
      labelName: CapitalizeInputLabel.Name,
      errors: errors?.name?.message,
      label: InputLabel.Name,
      ariaInvalid: errors?.name ? true : false,
      autoFocus: true,
    },
    {
      type: InputType.Email,
      placeholder: VariantsPlaceholder.Email,
      labelName: CapitalizeInputLabel.Email,
      errors: errors?.email?.message,
      label: InputLabel.Email,
      ariaInvalid: errors?.email ? true : false,
      autofill: 'email',
    },
    {
      type: InputType.Password,
      placeholder: VariantsPlaceholder.Password,
      labelName: CapitalizeInputLabel.Password,
      errors: errors?.password?.message,
      label: InputLabel.Password,
      ariaInvalid: errors?.password ? true : false,
    },
  ];
};
