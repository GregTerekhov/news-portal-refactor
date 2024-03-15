import { MenuItem } from 'types';

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
          liClasses: '',
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
        liClasses: '',
      });
    }
  }

  return menuItems;
};
