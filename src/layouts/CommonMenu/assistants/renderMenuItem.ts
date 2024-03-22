import type { MenuItem } from 'types';
import { ActiveLinks } from 'hooks';

type MenuItemProps = {
  activeLinks: ActiveLinks;
  navId: string;
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
