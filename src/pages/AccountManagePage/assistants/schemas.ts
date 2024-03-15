import * as yup from 'yup';

import {
  createEmailValidation,
  createPasswordValidation,
  createCurrentPassword,
  createConfirmPasswordValidation,
} from 'helpers'; // мемоїзовані функції схеми

export const updateEmailSchema = yup.object({
  email: createEmailValidation(),
  password: createCurrentPassword(),
});
export const updatePasswordSchema = yup.object({
  newPassword: createPasswordValidation(),
  confirmPassword: createConfirmPasswordValidation(createPasswordValidation()),
  password: createCurrentPassword(),
});
