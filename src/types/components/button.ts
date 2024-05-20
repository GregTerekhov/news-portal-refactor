import { IconName, IconSizes } from './icon';

export type ClickHandler =
  | ((() => void) | undefined)
  | ((event: React.FormEvent) => void)
  | (() => Promise<void>)
  | ((e: React.MouseEvent<HTMLButtonElement>) => void);

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}

export enum PrimaryButtonId {
  ChangePassword = 'Change password and login',
  SignIn = 'Login button',
  SignUp = 'Registration button',
  SignOut = 'Sign out button',
  AuthButton = 'Auth button for sign in and sign out',
  RedirectToPrevious = 'Redirect to previous page button',
  RedirectToHome = 'Redirect to home page button',
  ResetRequest = 'Reset all requests button',
  FilteringApply = 'Filters submit button',
  FilteringReset = 'Filters reset button',
  GeoPermission = 'Geolocation permission button',
  UpdateEmail = 'Button for applying change your new email',
  UpdatePassword = 'Button for applying change and confirm your new password',
  CancelDeleteNews = 'Cancel deletion the news',
  CancelClearLog = 'Cancel clearing log',
  DeleteNews = 'Delete selected news',
  ClearLog = 'Clear deleted news log',
  PreviousPage = 'Previous page button',
  NextPage = 'Next page button',
}

export enum VariantButton {
  Primary = 'Primary',
  Other = 'OtherButton',
  Small = 'Small',
}

export interface IFilterButtons {
  // цей тип майже повністю повторює тип пропсів для PrimaryButton
  type: ButtonType;
  id?: PrimaryButtonId | undefined;
  variant: VariantButton;
  onHandleClick: ClickHandler;
  ariaLabel?: string | undefined;
  classNameButtons?: string | undefined;
  hasIcon: boolean;
  svgName?: IconName | undefined;
  svgSize?: IconSizes;
  classNameIcon?: string | undefined;
  children?: string | undefined;
  disabled?: boolean;
}
