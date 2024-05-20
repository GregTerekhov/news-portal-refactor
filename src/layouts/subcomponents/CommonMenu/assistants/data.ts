import { type ActiveLinks, IconName, NavId, type MenuItem, Paths, Pages } from 'types';

type MenuItemProps = {
  activeLinks: ActiveLinks;
  navId: NavId;
  isThirdPartyRegister: boolean;
};

type MobileMenuLinks = {
  id: string;
  iconName: IconName;
  path: Paths;
  label: Pages;
};

export const renderMenuItem = ({
  activeLinks,
  navId,
  isThirdPartyRegister,
}: MenuItemProps): MenuItem[] => {
  const {
    isAccountPage,
    isManageAccountPage,
    isHomeActive,
    isFavoriteActive,
    isReadActive,
    isArchiveActive,
  } = activeLinks;

  if (navId === NavId.Account) {
    if (isThirdPartyRegister) {
      return [];
    } else {
      return [
        {
          path: Paths.Account,
          label: Pages.Account,
          icon: IconName.Account,
          activeLink: isAccountPage,
        },
        {
          path: Paths.AccountSettings,
          label: Pages.AccountSettings,
          icon: IconName.AccountSettings,
          activeLink: isManageAccountPage,
        },
      ];
    }
  } else {
    return [
      {
        path: Paths.Home,
        label: Pages.Home,
        icon: IconName.Home,
        activeLink: isHomeActive,
      },
      {
        path: Paths.Favourite,
        label: Pages.Favourite,
        icon: IconName.Favourite,
        activeLink: isFavoriteActive,
      },
      {
        path: Paths.Read,
        label: Pages.Read,
        icon: IconName.Read,
        activeLink: isReadActive,
      },
      {
        path: Paths.Archive,
        label: Pages.Archive,
        icon: IconName.Archive,
        activeLink: isArchiveActive,
      },
    ];
  }
};

export const getMenuLinks = (): MobileMenuLinks[] => {
  return [
    {
      id: 'Go home',
      iconName: IconName.Home,
      path: Paths.Home,
      label: Pages.Home,
    },
    {
      id: 'Go to Favourite Page',
      iconName: IconName.VotedFavourite,
      path: Paths.Favourite,
      label: Pages.Favourite,
    },
    {
      id: 'Go to Read Page',
      iconName: IconName.Read,
      path: Paths.Read,
      label: Pages.Read,
    },
    {
      id: 'Go to Archive Page',
      iconName: IconName.Archive,
      path: Paths.Archive,
      label: Pages.Archive,
    },
  ];
};
