import { ActiveLinks } from 'hooks';

export type MenuItem = {
  path: string;
  label: string;
  icon: string;
  activeLink: boolean;
};

export interface IMenuProps {
  navId: string;
  links: MenuItem[];
  handleLinkClick: () => void;
  activeLinks?: ActiveLinks;
}
