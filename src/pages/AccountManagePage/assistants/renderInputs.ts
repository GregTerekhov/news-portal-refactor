import { EmailInput, EmailInputsValues, PasswordInput, PasswordInputsValues } from '../types';

export const renderPasswordInputs = ({
  newPassword,
  confirmPassword,
  password,
  errors,
}: PasswordInputsValues): Array<PasswordInput> => {
  const passwordInputs: Array<PasswordInput> = [
    {
      placeholder: 'Enter new password',
      fieldValue: newPassword,
      errors: errors?.newPassword?.message,
      label: 'newPassword',
      ariaInvalid: errors?.newPassword ? true : false,
    },
    {
      placeholder: 'Confirm new password',
      fieldValue: confirmPassword,
      errors: errors?.confirmPassword?.message,
      label: 'confirmPassword',
      ariaInvalid: errors?.confirmPassword ? true : false,
    },
  ];

  const showCurrentPasswordInput =
    newPassword &&
    confirmPassword &&
    !errors?.newPassword?.message &&
    !errors?.confirmPassword?.message &&
    newPassword.length !== 0 &&
    confirmPassword.length !== 0;

  if (showCurrentPasswordInput) {
    passwordInputs.push({
      placeholder: 'Enter your current password',
      fieldValue: password,
      errors: errors?.password?.message,
      label: 'password',
      ariaInvalid: errors && errors?.password ? true : false,
    });
  }

  return passwordInputs;
};

export const renderEmailInputs = ({
  email,
  password,
  errors,
}: EmailInputsValues): Array<EmailInput> => {
  const emailInputs: Array<EmailInput> = [
    {
      type: 'email',
      placeholder: 'Enter new email',
      fieldValue: email,
      errors: errors?.email?.message,
      label: 'email',
      iconName: 'icon-envelop',
      ariaInvalid: errors?.email ? true : false,
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
      iconName: 'icon-envelop',
      ariaInvalid: errors?.password ? true : false,
    });
  }

  return emailInputs;
};
