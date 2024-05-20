import { type HaveAccounts } from '../db';

//SETTINGS
export enum ToastVariant {
  Background = 'non-interactive',
  Foreground = 'interactive',
}
export enum ToastStatus {
  Error = 'error',
  Success = 'success',
  Info = 'info',
}

//SUCCESS
export enum SuccessCaseWithoutAccount {
  SignUp = 'User sign-up and sign-in success',
  SignIn = 'User sign-in success',
  RememberMe = 'Your saved password has been successfully retrieved',
  SignOut = 'Sign-out success',
  UpdateEmail = 'Email is successfully updated',
  UpdatePassword = 'Password is successfully updated',
  RecoveryPasswordSent = 'Email sent successfully',
  PasswordChange = 'Password has successfully changed',
  DeleteNews = 'Remove news success',
  ClearLog = 'Your History Log news has been successfully cleared',
}

export type ToastSuccessCases<T extends keyof HaveAccounts> =
  | SuccessCaseWithoutAccount
  | `Account ${T} linking successful`
  | `Account ${T} unlinking successful`;

export enum ToastSuccessTitle {
  Welcome = 'Welcome',
  PasteCredentials = 'Paste credentials',
  Goodbye = 'Goodbye',
  UpdateCredentials = 'Update credentials',
  SendRecovery = 'Sending settings success',
  RecoverPassword = 'Password recovered',
  ClearLog = 'Clearing log',
  DeleteNews = 'Delete news',
  LinkAccount = 'Link Account',
  UnlinkAccount = 'Unlink Account',
  Default = 'Default title',
}

export type ToastSuccessDescription<T extends keyof HaveAccounts> =
  | ToastSuccessDescriptionWithoutAccount
  | `Your ${T} account is successfully linking`
  | `Your ${T} account has unlinked successfully`;

export enum ToastSuccessDescriptionWithoutAccount {
  Welcome = 'Welcome to New York Times News Viewer',
  RememberMe = 'Your credentials have been successfully inserted. Please push Sign in',
  Goodbye = 'See you soon! We will be waiting for you with new news',
  UpdateEmail = 'Your email address has been successfully updated',
  UpdatePassword = 'Your password has been successfully updated',
  SendRecovery = 'Your request is successfully sent. Please check your email and follow the instructions for recovering your password',
  RecoveryPassword = 'Your password successfully recovered',
  DeleteNews = 'News has been successfully deleted',
  ClearLog = 'Your deleted news feed has been successfully cleared',
  Default = 'Default description',
}

//ERROR
export enum ErrorCase {
  Conflict = 'Email already in use',
  NotAuthorised = 'User is not authentified',
  InvalidPassword = 'Password is not valid',
  NotFound = 'User not found',
  IncorrectPassword = 'Password incorrect',
  TooManyRequest = 429,
}

export enum ToastErrorTitle {
  Auth = 'Authorisation error',
  API = 'News API Error',
  Unknown = 'Unknown Error',
}

export enum ToastErrorDescription {
  Conflict = 'Email already in use',
  BadCredentialsRequest = 'Email or password are wrong',
  BadPasswordRequest = 'Password is wrong',
  NotFound = 'User is not found',
  ManyRequests = 'Too many requests',
  Unknown = 'Try to reload page',
}

//INFO
export enum ToastInfoTitle {
  FoundNews = 'Found news',
  MonthStatistics = 'Month statistics',
  Unknown = 'Unknown Title',
}

//GENERAL
export type ToastTitle = ToastSuccessTitle | ToastErrorTitle | ToastInfoTitle;

export type ToastDescription =
  | ToastSuccessDescription<keyof HaveAccounts>
  | ToastErrorDescription
  | string;

export interface ToastMessage {
  title: ToastTitle;
  description: ToastDescription;
}
