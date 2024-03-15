import { ActiveLinks } from 'hooks';

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
  Header = 'header',
  FilterServiceBlock = 'filterServiceBlock',
  Checkbox = 'checkbox',
}

export type InputLabel = 'name' | 'email' | 'password' | 'newPassword' | 'confirmPassword';

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
  navId: string;
  links: MenuItem[];
  handleLinkClick: () => void;
  activeLinks?: ActiveLinks;
}
