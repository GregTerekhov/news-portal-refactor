import * as yup from 'yup';

import {
  createConfirmPasswordValidation,
  createEmailValidation,
  createNameValidation,
  createPasswordValidation,
} from 'helpers'; // мемоїзовані функції схеми

export const signUpSchema = yup.object({
  name: createNameValidation(),
  email: createEmailValidation(),
  password: createPasswordValidation(),
});
export const signInSchema = yup.object({
  email: createEmailValidation(),
  password: createPasswordValidation(),
});
export const recoveryPasswordSchema = yup.object({
  email: createEmailValidation(),
});
export const changePasswordSchema = yup.object({
  newPassword: createPasswordValidation(),
  confirmPassword: createConfirmPasswordValidation(createPasswordValidation()),
});
