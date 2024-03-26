import memoizeOne from 'memoize-one';
import * as yup from 'yup';

export const createEmailValidation = memoizeOne(() =>
  yup
    .string()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
    .trim(),
);

export const createPasswordValidation = memoizeOne(() =>
  yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one number, and one special character',
    )
    .trim(),
);

export const createCurrentPassword = memoizeOne(() =>
  yup.string().required('Please enter your current password to confirm changes').trim(),
);

export const createConfirmPasswordValidation = memoizeOne(
  (passwordValidation: yup.StringSchema<string>) =>
    yup
      .string()
      .required('Confirm password is required')
      .test('passwords-match', 'Passwords do not match', function (value) {
        return value === this.parent.newPassword;
      })
      .trim()
      .concat(passwordValidation),
);
