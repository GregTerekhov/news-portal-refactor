export type ClickHandler =
  | ((() => void) | undefined)
  | ((event: React.FormEvent) => void)
  | (() => Promise<void>)
  | ((e: React.MouseEvent<HTMLButtonElement>) => void);

export type PrimaryButtonType = 'button' | 'submit' | 'reset';

export enum VariantButton {
  Primary = 'Primary',
  Other = 'OtherButton',
  Small = 'Small',
}

export enum VariantSwitcher {
  Modal = 'modal',
  Header = 'header',
  Footer = 'footer',
}

export enum VariantInputs {
  FilterServiceBlock = 'filterServiceBlock',
  Checkbox = 'checkbox',
}

export type InputLabel = 'name' | 'email' | 'password' | 'newPassword' | 'confirmPassword';
export type NavId = 'account-navigation' | 'main-navigation';

export enum VariantVerifiableInputs {
  Auth = 'auth',
  Account = 'accountPage',
}

export type MenuItem = {
  path: string;
  label: string;
  icon?: string | undefined;
  activeLink?: boolean;
  liClasses?: string | undefined;
};

export interface IMenuProps {
  navId: NavId;
  links: MenuItem[];
  handleLinkClick: () => void;
  isHomeActive: boolean;
}
