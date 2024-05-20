import { object, ObjectSchema } from 'yup';

import type { AuthRequestWithoutName, ExtendedUpdatePassword } from 'types';

import {
  createEmailValidation,
  createPasswordValidation,
  createCurrentPasswordValidation,
  createConfirmPasswordValidation,
} from 'helpers'; // мемоїзовані функції схеми

export const updateEmailSchema: ObjectSchema<AuthRequestWithoutName> = object({
  email: createEmailValidation(),
  password: createCurrentPasswordValidation(),
});
export const updatePasswordSchema: ObjectSchema<ExtendedUpdatePassword> = object({
  newPassword: createPasswordValidation(),
  confirmPassword: createConfirmPasswordValidation(createPasswordValidation()),
  password: createCurrentPasswordValidation(),
});
