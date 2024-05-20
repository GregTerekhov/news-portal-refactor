import { IconName, IconSizes, Pages, Paths, type MenuItem } from 'types';

interface MenuItemProps {
  isAuthenticated: boolean;
  isAboutUs: boolean;
}

interface SocialLinks {
  link: string;
  iconName: IconName;
  label: string;
  size: IconSizes;
}

export const renderMenuItem = ({ isAuthenticated, isAboutUs }: MenuItemProps): MenuItem[] => {
  const menuItems: MenuItem[] = isAuthenticated
    ? [
        {
          path: Paths.Home,
          label: Pages.Home,
          liClasses: 'row-start-1 col-start-1',
        },
        {
          path: Paths.Favourite,
          label: Pages.Favourite,
          liClasses: 'row-start-2 col-start-1 md:row-start-1 md:col-start-2',
        },
        {
          path: Paths.Read,
          label: Pages.Read,
          liClasses: 'row-start-1 col-start-2 md:col-start-3 md:row-start-1',
        },
        {
          path: Paths.Archive,
          label: Pages.Archive,
          liClasses: 'row-start-2 col-start-2 md:col-start-4 md:row-start-1',
        },
        {
          path: Paths.Account,
          label: Pages.Account,
          liClasses: 'row-start-1 col-start-3 md:col-start-5 md:row-start-1',
        },
      ]
    : [
        {
          path: Paths.Home,
          label: Pages.Home,
        },
      ];

  if (!isAboutUs) {
    if (isAuthenticated) {
      menuItems.push({
        path: Paths.About,
        label: Pages.About,
        liClasses: 'row-start-2 col-start-3 md:col-start-6 md:row-start-1',
      });
    } else {
      menuItems.push({
        path: Paths.About,
        label: Pages.About,
      });
    }
  }

  return menuItems;
};

export const renderSocialLinks = (isWideScreens: boolean): Array<SocialLinks> => {
  return [
    {
      link: 'https://www.facebook.com/nytimes',
      iconName: IconName.Facebook,
      label: 'Facebook',
      size: isWideScreens ? IconSizes.mdIcon28 : IconSizes.smIcon20,
    },
    {
      link: 'https://twitter.com/nytimes',
      iconName: IconName.Twitter,
      label: 'Twitter',
      size: isWideScreens ? IconSizes.mdIcon28 : IconSizes.smIcon20,
    },
    {
      link: 'https://www.youtube.com/@nytimes',
      iconName: IconName.Youtube,
      label: 'YouTube',
      size: isWideScreens ? IconSizes.lgIcon36 : IconSizes.mdIcon28,
    },
    {
      link: 'https://www.linkedin.com/company/the-new-york-times/',
      iconName: IconName.Linkedin,
      label: 'LinkedIn',
      size: isWideScreens ? IconSizes.mdIcon28 : IconSizes.smIcon20,
    },
  ];
};
