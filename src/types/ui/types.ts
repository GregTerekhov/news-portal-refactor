export type ClickHandler =
  | ((() => void) | undefined)
  | ((event: React.FormEvent) => void)
  | (() => Promise<void>)
  | ((e: React.MouseEvent<HTMLButtonElement>) => void);

export enum VariantButton {
  Primary = 'Primary',
  Other = 'OtherButton',
  Small = 'Small',
}

export enum VariantModals {
  Auth = 'auth',
  DeleteNews = 'deleteNews',
}

export enum VariantSwitcher {
  Modal = 'modal',
  Header = 'header',
  Footer = 'footer',
}

export enum VariantInputs {
  Header = 'header',
  FilterServiceBlock = 'filterServiceBlock',
  Checkbox = 'checkbox',
}

export type InputLabel =
  | 'name'
  | 'email'
  | 'password'
  | 'newPassword'
  | 'confirmPassword'
  | 'recoveryEmail';

export enum VariantVerifiableInputs {
  Auth = 'auth',
  Account = 'accountPage',
}
