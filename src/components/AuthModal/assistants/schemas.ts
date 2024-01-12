import * as yup from 'yup';

import { createEmailValidation, createPasswordValidation } from 'helpers'; // мемоїзовані функції схеми

export const signUpSchema = yup.object({
  name: yup.string().min(3).max(20).required('Name is required'),
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
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .test('passwords-match', 'Passwords do not match', function (value) {
      return value === this.parent.newPassword;
    })
    .trim(),
});
