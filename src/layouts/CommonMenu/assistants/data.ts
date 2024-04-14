import type { MenuItem } from 'types';
import type { ActiveLinks } from 'hooks';

type MenuItemProps = {
  activeLinks: ActiveLinks;
  navId: string;
};

type MobileMenuLinks = {
  id: string;
  iconName: string;
  path: string;
  label: string;
};

export const renderMenuItem = ({ activeLinks, navId }: MenuItemProps): MenuItem[] => {
  const links: MenuItem[] =
    navId === 'main-navigation'
      ? [
          { path: '/', label: 'Home', icon: 'home', activeLink: activeLinks.isHomeActive },
          {
            path: '/favourite',
            label: 'Favourite',
            icon: 'heart-menu',
            activeLink: activeLinks.isFavoriteActive,
          },
          {
            path: '/read',
            label: 'Read',
            icon: 'open-book',
            activeLink: activeLinks.isReadActive,
          },
          {
            path: '/archive',
            label: 'Archive',
            icon: 'archive',
            activeLink: activeLinks.isArchiveActive,
          },
        ]
      : [
          {
            path: '/account',
            label: 'Account',
            icon: 'account',
            activeLink: activeLinks.isAccountPage,
          },
          {
            path: '/account-manage',
            label: 'Account settings',
            icon: 'manage',
            activeLink: activeLinks.isManageAccountPage,
          },
        ];

  return links;
};

export const getMenuLinks = () => {
  const links: MobileMenuLinks[] = [
    {
      id: 'Go home',
      iconName: 'home',
      path: '/',
      label: 'Home',
    },
    {
      id: 'Go to Favourite Page',
      iconName: 'heart',
      path: '/favourite',
      label: 'Favourite',
    },
    {
      id: 'Go to Read Page',
      iconName: 'open-book',
      path: '/read',
      label: 'Read',
    },
    {
      id: 'Go to Archive Page',
      iconName: 'archive',
      path: '/archive',
      label: 'Archive',
    },
  ];

  return links;
};
