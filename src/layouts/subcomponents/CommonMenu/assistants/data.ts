import type { MenuItem, NavId } from 'types';
import type { ActiveLinks } from 'hooks';

type MenuItemProps = {
  activeLinks: ActiveLinks;
  navId: NavId;
  isThirdPartyRegister: boolean;
};

type MobileMenuLinks = {
  id: string;
  iconName: string;
  path: string;
  label: string;
};

export const renderMenuItem = ({
  activeLinks,
  navId,
  isThirdPartyRegister,
}: MenuItemProps): MenuItem[] => {
  let links: MenuItem[];

  if (navId === 'account-navigation') {
    if (isThirdPartyRegister) {
      links = [];
    } else {
      links = [
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
    }
  } else {
    links = [
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
    ];
  }

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
