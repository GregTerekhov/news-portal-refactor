import type {
  AuthRequestWithoutName,
  ChangePasswordValues,
  ExtendedUpdatePassword,
  MainCredentials,
  SendEmailRequest,
} from '../db';
import { IconName } from './icon';

export enum InputName {
  Checkbox = 'checkbox',
  Query = 'query',
  Keyword = 'keyword',
  Author = 'author',
  Title = 'title',
  Publisher = 'publisher',
  DeletedNews = 'deleted news',
}

export enum InputType {
  Text = 'text',
  Password = 'password',
  Email = 'email',
  Checkbox = 'checkbox',
}

export enum InputLabel {
  Name = 'name',
  Email = 'email',
  Password = 'password',
  NewPassword = 'newPassword',
  ConfirmPassword = 'confirmPassword',
}

export enum CapitalizeInputLabel {
  Name = 'Name',
  Email = 'Email',
  Password = 'Password',
  NewPassword = 'NewPassword',
  ConfirmPassword = 'ConfirmPassword',
}

export enum VariantsPlaceholder {
  Password = 'Enter your password',
  NewPassword = 'Enter your new password',
  ConfirmPassword = 'Confirm new password',
  CurrentPassword = 'Enter your current password',
  RecoveryPassword = 'Enter your current email',
  Email = 'Enter your email',
  NewEmail = 'Enter your new email',
  Name = 'Enter your name',
  RequestByKeyword = 'Search |',
  FilterByKeyword = 'Keyword',
  FilterByAuthor = 'Author',
  FilterByTitle = 'Title',
  FilterByPublisher = 'Publisher',
}

export interface AuthInputs {
  type: InputType;
  placeholder: VariantsPlaceholder;
  fieldValue?: string | undefined;
  errors?: string | undefined;
  label: InputLabel;
  labelName: CapitalizeInputLabel;
  ariaInvalid?: boolean | undefined;
  autoFocus?: boolean;
  autofill?: string;
  disabled?: boolean;
}

export interface UpdateCredentialsInput {
  type: InputType;
  placeholder: VariantsPlaceholder;
  fieldValue: string;
  errors?: string | undefined;
  label: InputLabel;
  iconName: IconName;
  ariaInvalid?: boolean;
  autoFocus?: boolean;
  autofill?: string;
}

export enum VariantVerifiableInputs {
  Auth = 'auth',
  Account = 'accountPage',
}

export type VerifiableInputValues =
  | ChangePasswordValues
  | ExtendedUpdatePassword
  | MainCredentials
  | AuthRequestWithoutName
  | SendEmailRequest;
