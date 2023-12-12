import * as yup from 'yup';

import { createEmailValidation, createPasswordValidation } from 'helpers';

export const signUpSchema = yup.object({
  name: yup.string().min(3).max(20).required('Name is required'),
  email: createEmailValidation(), // мемоїзована функція схеми
  password: createPasswordValidation(), // мемоїзована функція схеми
});
export const signInSchema = yup.object({
  email: createEmailValidation(), // мемоїзована функція схеми
  password: createPasswordValidation(), // мемоїзована функція схеми
});
export const recoveryPasswordSchema = yup.object({
  recoveryEmail: createEmailValidation(), // мемоїзована функція схеми
});

export const changePasswordSchema = yup.object({
  changedPassword: createPasswordValidation(), // мемоїзована функція схеми
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .test('passwords-match', 'Passwords do not match', function (value) {
      return value === this.parent.changedPassword;
    })
    .trim(),
});
