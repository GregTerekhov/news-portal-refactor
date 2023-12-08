import { FieldErrors } from 'react-hook-form';

import { IUpdateEmail, IUpdatePassword } from 'types';

type PasswordInputsValues = {
  newPassword: string;
  confirmPassword: string;
  oldPassword: string;
  errors?: FieldErrors<Required<IUpdatePassword>>;
};

type EmailInputsValues = {
  updatedEmail: string;
  currentPassword: string;
  errors?: FieldErrors<Required<IUpdateEmail>>;
};

type PasswordInput = {
  placeholder: string;
  fieldValue: string;
  errors?: string | undefined;
  label: string;
  ariaInvalid?: boolean;
};

type EmailInput = {
  type: string;
  placeholder: string;
  fieldValue: string;
  errors?: string | undefined;
  label: string;
  iconName: string;
  ariaInvalid?: boolean;
};

export const renderPasswordInputs = ({
  newPassword,
  confirmPassword,
  oldPassword,
  errors,
}: PasswordInputsValues): PasswordInput[] => {
  const passwordInputs: PasswordInput[] = [
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
      fieldValue: oldPassword,
      errors: errors?.oldPassword?.message,
      label: 'oldPassword',
      ariaInvalid: errors && errors?.oldPassword ? true : false,
    });
  }

  return passwordInputs;
};

export const renderEmailInputs = ({
  updatedEmail,
  currentPassword,
  errors,
}: EmailInputsValues): EmailInput[] => {
  const emailInputs: EmailInput[] = [
    {
      type: 'email',
      placeholder: 'Enter new email',
      fieldValue: updatedEmail,
      errors: errors?.updatedEmail?.message,
      label: 'updatedEmail',
      iconName: 'icon-envelop',
      ariaInvalid: errors?.updatedEmail ? true : false,
    },
  ];

  const showCurrentPasswordInput =
    updatedEmail && !errors?.updatedEmail?.message && updatedEmail.length !== 0;

  if (showCurrentPasswordInput) {
    emailInputs.push({
      type: 'password',
      placeholder: 'Enter your current password',
      fieldValue: currentPassword,
      errors: errors?.currentPassword?.message,
      label: 'updatedEmail',
      iconName: 'icon-envelop',
      ariaInvalid: errors?.currentPassword ? true : false,
    });
  }

  return emailInputs;
};
