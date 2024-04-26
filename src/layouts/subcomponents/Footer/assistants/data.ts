import type { MenuItem } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';

interface MenuItemProps {
  isAuthenticated: boolean;
  isAboutUs: boolean;
}

export const renderMenuItem = ({ isAuthenticated, isAboutUs }: MenuItemProps): MenuItem[] => {
  const menuItems: MenuItem[] = isAuthenticated
    ? [
        {
          path: '/',
          label: 'Home',
          liClasses: 'row-start-1 col-start-1',
        },
        {
          path: '/favourite',
          label: 'Favourite',
          liClasses: 'row-start-2 col-start-1 md:row-start-1 md:col-start-2',
        },
        {
          path: '/read',
          label: 'Read',
          liClasses: 'row-start-1 col-start-2 md:col-start-3 md:row-start-1',
        },
        {
          path: '/archive',
          label: 'Archive',
          liClasses: 'row-start-2 col-start-2 md:col-start-4 md:row-start-1',
        },
        {
          path: '/account',
          label: 'Account',
          liClasses: 'row-start-1 col-start-3 md:col-start-5 md:row-start-1',
        },
      ]
    : [
        {
          path: '/',
          label: 'Home',
        },
      ];

  if (!isAboutUs) {
    if (isAuthenticated) {
      menuItems.push({
        path: '/about-us',
        label: 'About Us',
        liClasses: 'row-start-2 col-start-3 md:col-start-6 md:row-start-1',
      });
    } else {
      menuItems.push({
        path: '/about-us',
        label: 'About Us',
      });
    }
  }

  return menuItems;
};

type SocialLinks = {
  link: string;
  iconName: string;
  label: string;
  size: keyof typeof ICON_SIZES;
};

export const renderSocialLinks = (wideScreens: boolean): Array<SocialLinks> => {
  const links: SocialLinks[] = [
    {
      link: 'https://www.facebook.com/nytimes',
      iconName: 'facebook',
      label: 'Facebook',
      size: wideScreens ? 'mdIcon28' : 'smIcon20',
    },
    {
      link: 'https://twitter.com/nytimes',
      iconName: 'twitter',
      label: 'Twitter',
      size: wideScreens ? 'mdIcon28' : 'smIcon20',
    },
    {
      link: 'https://www.youtube.com/@nytimes',
      iconName: 'youtube',
      label: 'YouTube',
      size: wideScreens ? 'lgIcon36' : 'mdIcon28',
    },
    {
      link: 'https://www.linkedin.com/company/the-new-york-times/',
      iconName: 'linkedin',
      label: 'LinkedIn',
      size: wideScreens ? 'mdIcon28' : 'smIcon20',
    },
  ];

  return links;
};
