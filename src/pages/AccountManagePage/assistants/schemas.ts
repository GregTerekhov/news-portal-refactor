import * as yup from 'yup';

export const updateEmailSchema = yup.object({
  updatedEmail: yup
    .string()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
    .trim(),
  currentPassword: yup
    .string()
    .required('Please enter your current password to confirm changes')
    .trim(),
});
export const updatePasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one number, and one special character',
    )
    .trim(),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .test('passwords-match', 'Passwords do not match', function (value) {
      return value === this.parent.newPassword;
    })
    .trim(),
  oldPassword: yup
    .string()
    .required('Please enter your current password to confirm changes')
    .trim(),
});
