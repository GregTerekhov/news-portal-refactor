import memoizeOne from 'memoize-one';
import { string, StringSchema } from 'yup';

enum ValidateErrorMessage {
  MinNameLength = 'Name must be at least 4 characters',
  MaxNameLength = 'Name must be at most 20 characters',
  NameRequired = 'Name is required',
  EmailRequired = 'Email is required',
  EmailFormat = 'Invalid email format',
  PasswordRequired = 'Password is required',
  MinPasswordLength = 'Password must be at least 8 characters',
  PasswordFormat = 'Password must contain at least one uppercase letter, one number, and one special character',
  CurrentPasswordRequired = 'Please enter your current password to confirm changes',
  ConfirmPasswordRequired = 'Confirm password is required',
  PasswordMatch = 'Passwords do not match',
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//Мемоїзація схеми валідації користувацького імені
export const createNameValidation = memoizeOne(
  (): StringSchema<string> =>
    string()
      .min(4, ValidateErrorMessage.MinNameLength)
      .max(20, ValidateErrorMessage.MaxNameLength)
      .required(ValidateErrorMessage.NameRequired),
);

//Мемоїзація схеми валідації користувацької пошти
export const createEmailValidation = memoizeOne(
  (): StringSchema<string> =>
    string()
      .required(ValidateErrorMessage.EmailRequired)
      .matches(emailRegex, ValidateErrorMessage.EmailFormat)
      .trim(),
);

//Мемоїзація схеми валідації користувацького пароля
export const createPasswordValidation = memoizeOne(
  (): StringSchema<string> =>
    string()
      .required(ValidateErrorMessage.PasswordRequired)
      .min(8, ValidateErrorMessage.MinPasswordLength)
      .matches(passwordRegex, ValidateErrorMessage.PasswordFormat)
      .trim(),
);

//Мемоїзація схеми валідації поточного користувацького пароля
export const createCurrentPasswordValidation = memoizeOne(
  (): StringSchema<string> =>
    string().required(ValidateErrorMessage.CurrentPasswordRequired).trim(),
);

//Мемоїзація схеми валідації повтора користувацького пароля
export const createConfirmPasswordValidation = memoizeOne(
  (passwordValidation: StringSchema<string>): StringSchema<string> =>
    string()
      .required(ValidateErrorMessage.ConfirmPasswordRequired)
      .test('passwords-match', ValidateErrorMessage.PasswordMatch, function (value) {
        return value === this.parent.newPassword;
      })
      .trim()
      .concat(passwordValidation),
);
