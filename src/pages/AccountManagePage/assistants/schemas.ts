import * as yup from 'yup';

import { createEmailValidation, createPasswordValidation, createCurrentPassword } from 'helpers';

export const updateEmailSchema = yup.object({
  updatedEmail: createEmailValidation(),
  currentPassword: createCurrentPassword(),
});
export const updatePasswordSchema = yup.object({
  newPassword: createPasswordValidation(),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .test('passwords-match', 'Passwords do not match', function (value) {
      return value === this.parent.newPassword;
    })
    .trim(),
  oldPassword: createCurrentPassword(),
});
