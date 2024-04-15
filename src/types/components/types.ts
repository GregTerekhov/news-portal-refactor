import type { InputLabel, HaveAccounts } from '..';

export type ToastVariant = 'non-interactive' | 'interactive';
export type ToastStatus = 'error' | 'success' | 'info';
export type ToastSuccessCases =
  | 'User sign-in success'
  | 'Your saved password has been successfully retrieved'
  | 'Sign-out success'
  | 'Email is successfully updated'
  | 'Password is successfully updated'
  | 'Email sent successfully'
  | 'Password has successfully changed'
  | 'Remove news success'
  | 'Your deleted news feed has been successfully cleared'
  | `Account ${keyof HaveAccounts} linking successful`;
// | string;

export type ToastSuccessTitle =
  | 'Welcome'
  | 'Paste credentials'
  | 'Goodbye'
  | 'Update credentials'
  | 'Sending settings success'
  | 'Password recovered'
  | 'Delete news'
  | 'Clearing log'
  | 'Link Account'
  | 'Unlink Account'
  | 'Default title';

export type ToastSuccessDescription<T extends keyof HaveAccounts> =
  | ToastSuccessDescriptionWithoutAccount
  | `Your ${T} account is successfully linking`
  | `Your ${T} account has unlinked successfully`;

type ToastSuccessDescriptionWithoutAccount =
  | 'Welcome to New York Times News Viewer'
  | 'Your credentials have been successfully inserted'
  | 'See you soon! We will be waiting for you with new news'
  | 'Your email address has been successfully updated'
  | 'Your password has been successfully updated'
  | 'Your request is successfully sent. Please check your email and follow the instructions for recovering your password'
  | 'Your password successfully recovered'
  | 'News has been successfully deleted'
  | 'Your deleted news feed has been successfully cleared'
  | 'Default description';

export type ToastErrorTitle = 'Authorisation error' | 'News API Error' | 'UnknownError';
export type ToastErrorDescription =
  | 'Email already in use'
  | 'Email or password are wrong'
  | 'User is not found'
  | 'Password is wrong'
  | 'Too many requests'
  | 'Try to reload page';

export type ToastInfoTitle = 'Found news' | 'Monthly statistics' | 'Monthly statistics' | '';

export type ToastTitle = ToastSuccessTitle | ToastErrorTitle | ToastInfoTitle;
export type ToastDescription =
  | ToastSuccessDescription<keyof HaveAccounts>
  | ToastErrorDescription
  | string;

export interface ToastMessage {
  title: ToastTitle;
  description: ToastDescription;
}

export interface AuthInputs {
  type: string;
  placeholder: string;
  labelName: string;
  errors?: string | undefined;
  label: InputLabel;
  ariaInvalid?: boolean | undefined;
  fieldValue?: string | undefined;
  autoFocus?: boolean;
  autofill?: string;
  disabled: boolean;
}

export interface SelectedDate {
  beginDate: string;
  endDate: string;
}

export type UpdateCredentialsInput = {
  type: string;
  placeholder: string;
  fieldValue: string;
  errors?: string | undefined;
  label: InputLabel;
  iconName: string;
  ariaInvalid?: boolean;
  autofill?: string;
};
