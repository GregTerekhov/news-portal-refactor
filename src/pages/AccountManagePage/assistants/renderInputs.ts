import type { FieldErrors } from 'react-hook-form';
import {
  IconName,
  InputLabel,
  InputType,
  VariantsPlaceholder,
  type AuthRequestWithoutName,
  type ExtendedUpdatePassword,
  type UpdateCredentialsInput,
} from 'types';

type EmailInputsValues = {
  email: string;
  password: string;
  errors?: FieldErrors<AuthRequestWithoutName>;
};

type PasswordInputsValues = {
  newPassword: string;
  confirmPassword: string;
  password: string;
  errors?: FieldErrors<Required<ExtendedUpdatePassword>>;
};

export const renderPasswordInputs = ({
  newPassword,
  confirmPassword,
  password,
  errors,
}: PasswordInputsValues): Array<UpdateCredentialsInput> => {
  const passwordInputs: Array<UpdateCredentialsInput> = [
    {
      type: InputType.Password,
      placeholder: VariantsPlaceholder.NewPassword,
      fieldValue: newPassword,
      errors: errors?.newPassword?.message,
      label: InputLabel.NewPassword,
      ariaInvalid: !!errors?.newPassword ?? false,
      iconName: IconName.Password,
      autoFocus: true,
    },
    {
      type: InputType.Password,
      placeholder: VariantsPlaceholder.ConfirmPassword,
      fieldValue: confirmPassword,
      errors: errors?.confirmPassword?.message,
      label: InputLabel.ConfirmPassword,
      ariaInvalid: !!errors?.confirmPassword ?? false,
      iconName: IconName.Password,
    },
  ];

  const shouldShowCurrentPasswordInput =
    !!newPassword &&
    !!confirmPassword &&
    !errors?.newPassword?.message &&
    !errors?.confirmPassword?.message;

  if (shouldShowCurrentPasswordInput) {
    passwordInputs.push({
      type: InputType.Password,
      placeholder: VariantsPlaceholder.CurrentPassword,
      fieldValue: password,
      errors: errors?.password?.message,
      label: InputLabel.Password,
      ariaInvalid: !!errors?.password ?? false,
      iconName: IconName.Password,
    });
  }

  return passwordInputs;
};

export const renderEmailInputs = ({
  email,
  password,
  errors,
}: EmailInputsValues): Array<UpdateCredentialsInput> => {
  const emailInputs: Array<UpdateCredentialsInput> = [
    {
      type: InputType.Email,
      placeholder: VariantsPlaceholder.NewEmail,
      fieldValue: email,
      errors: errors?.email?.message,
      label: InputLabel.Email,
      iconName: IconName.Envelop,
      ariaInvalid: !!errors?.email ?? false,
      autofill: 'email',
      autoFocus: true,
    },
  ];

  const shouldShowCurrentPasswordInput = email && !errors?.email?.message && email.length !== 0;

  if (shouldShowCurrentPasswordInput) {
    emailInputs.push({
      type: InputType.Password,
      placeholder: VariantsPlaceholder.CurrentPassword,
      fieldValue: password,
      errors: errors?.password?.message,
      label: InputLabel.Password,
      iconName: IconName.Password,
      ariaInvalid: !!errors?.password ?? false,
    });
  }

  return emailInputs;
};
