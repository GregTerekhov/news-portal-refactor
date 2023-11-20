import * as yup from 'yup';

export const signUpSchema = yup.object({
  name: yup.string().min(3).max(20).required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one number, and one special character',
    ),
});
export const signInSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one number, and one special character',
    ),
});
export const recoveryPasswordSchema = yup.object({
  recoveryEmail: yup
    .string()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
});
export const updateEmailSchema = yup.object({
  updateEmail: yup
    .string()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
});
export const updatePasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one number, and one special character',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .test('passwords-match', 'Passwords do not match', function (value) {
      return value === this.parent.newPassword;
    }),
});
