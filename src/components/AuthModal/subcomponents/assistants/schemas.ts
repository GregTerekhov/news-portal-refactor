import { object, ObjectSchema } from 'yup';

import type {
  AuthRequestWithoutName,
  ChangePasswordValues,
  MainCredentials,
  SendEmailRequest,
} from 'types';

import {
  createConfirmPasswordValidation,
  createEmailValidation,
  createNameValidation,
  createPasswordValidation,
} from 'helpers'; // мемоїзовані функції схеми

export const signUpSchema: ObjectSchema<MainCredentials> = object({
  name: createNameValidation(),
  email: createEmailValidation(),
  password: createPasswordValidation(),
});
export const signInSchema: ObjectSchema<AuthRequestWithoutName> = object({
  email: createEmailValidation(),
  password: createPasswordValidation(),
});
export const recoveryPasswordSchema: ObjectSchema<SendEmailRequest> = object({
  email: createEmailValidation(),
});
export const changePasswordSchema: ObjectSchema<ChangePasswordValues> = object({
  newPassword: createPasswordValidation(),
  confirmPassword: createConfirmPasswordValidation(createPasswordValidation()),
});
