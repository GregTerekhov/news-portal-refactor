import memoizeOne from 'memoize-one';
import * as yup from 'yup';

//Мемоїзація схеми валідації користувацького імені
export const createNameValidation = memoizeOne(() =>
  yup.string().min(4).max(20).required('Name is required'),
);

//Мемоїзація схеми валідації користувацької пошти
export const createEmailValidation = memoizeOne(() =>
  yup
    .string()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
    .trim(),
);

//Мемоїзація схеми валідації користувацького пароля
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

//Мемоїзація схеми валідації поточного користувацького пароля
export const createCurrentPassword = memoizeOne(() =>
  yup.string().required('Please enter your current password to confirm changes').trim(),
);

//Мемоїзація схеми валідації повтора користувацького пароля
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
