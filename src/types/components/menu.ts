import { Pages, Paths } from '../utils';
import { IconName } from './icon';

export interface MenuItem {
  path: Paths;
  label: Pages;
  icon?: IconName;
  activeLink?: boolean;
  liClasses?: string | undefined;
}

export interface IMenuProps {
  navId: NavId;
  links: MenuItem[];
  handleLinkClick: () => void;
  isHomeActive: boolean;
}

export enum NavId {
  Account = 'account-navigation',
  Main = 'main-navigation',
}
