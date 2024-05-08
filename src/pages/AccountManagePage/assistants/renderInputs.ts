import type { FieldErrors } from 'react-hook-form';
import type {
  AuthRequestWithoutName,
  ExtendedUpdatePasswordRequest,
  UpdateCredentialsInput,
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
  errors?: FieldErrors<Required<ExtendedUpdatePasswordRequest>>;
};

export const renderPasswordInputs = ({
  newPassword,
  confirmPassword,
  password,
  errors,
}: PasswordInputsValues): Array<UpdateCredentialsInput> => {
  //Data для updatePassword-інпутів
  const passwordInputs: Array<UpdateCredentialsInput> = [
    {
      type: 'password',
      placeholder: 'Enter new password',
      fieldValue: newPassword,
      errors: errors?.newPassword?.message,
      label: 'newPassword',
      ariaInvalid: !!errors?.newPassword ?? false,
      iconName: 'password',
    },
    {
      type: 'password',
      placeholder: 'Confirm new password',
      fieldValue: confirmPassword,
      errors: errors?.confirmPassword?.message,
      label: 'confirmPassword',
      ariaInvalid: !!errors?.confirmPassword ?? false,
      iconName: 'password',
    },
  ];

  const showCurrentPasswordInput =
    !!newPassword &&
    !!confirmPassword &&
    !errors?.newPassword?.message &&
    !errors?.confirmPassword?.message;

  if (showCurrentPasswordInput) {
    passwordInputs.push({
      type: 'password',
      placeholder: 'Enter your current password',
      fieldValue: password,
      errors: errors?.password?.message,
      label: 'password',
      ariaInvalid: !!errors?.password ?? false,
      iconName: 'password',
    });
  }

  return passwordInputs;
};

export const renderEmailInputs = ({
  email,
  password,
  errors,
}: EmailInputsValues): Array<UpdateCredentialsInput> => {
  //Data для updateEmail-інпутів
  const emailInputs: Array<UpdateCredentialsInput> = [
    {
      type: 'email',
      placeholder: 'Enter new email',
      fieldValue: email,
      errors: errors?.email?.message,
      label: 'email',
      iconName: 'envelop',
      ariaInvalid: !!errors?.email ?? false,
      autofill: 'email',
    },
  ];

  const showCurrentPasswordInput = email && !errors?.email?.message && email.length !== 0;

  if (showCurrentPasswordInput) {
    emailInputs.push({
      type: 'password',
      placeholder: 'Enter your current password',
      fieldValue: password,
      errors: errors?.password?.message,
      label: 'password',
      iconName: 'password',
      ariaInvalid: !!errors?.password ?? false,
    });
  }

  return emailInputs;
};
