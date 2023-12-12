import { ActiveLinks } from 'hooks/useActiveLinks';

type MenuItemProps = {
  activeLinks: ActiveLinks;
  navId: string;
};

export type MenuItem = {
  path: string;
  label: string;
  icon: string;
  activeLink: boolean;
};

export const renderMenuItem = ({ activeLinks, navId }: MenuItemProps): MenuItem[] => {
  const links: MenuItem[] =
    navId === 'main-navigation'
      ? [
          { path: '/', label: 'Home', icon: 'icon-home', activeLink: activeLinks.isHomeActive },
          {
            path: '/favourite',
            label: 'Favourite',
            icon: 'icon-heart-menu',
            activeLink: activeLinks.isFavoriteActive,
          },
          {
            path: '/read',
            label: 'Read',
            icon: 'icon-open-book',
            activeLink: activeLinks.isReadActive,
          },
          {
            path: '/archive',
            label: 'Archive',
            icon: 'icon-archive',
            activeLink: activeLinks.isArchiveActive,
          },
        ]
      : [
          {
            path: '/account',
            label: 'Account',
            icon: 'icon-account',
            activeLink: activeLinks.isAccountPage,
          },
          {
            path: '/account-manage',
            label: 'Account settings',
            icon: 'icon-manage',
            activeLink: activeLinks.isManageAccountPage,
          },
        ];

  return links;
};
