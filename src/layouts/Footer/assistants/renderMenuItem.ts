import { ActiveLinks } from 'hooks/useActiveLinks';

interface MenuItemProps {
  isAuthenticated: boolean;
  activeLinks: ActiveLinks;
}

type MenuItem = {
  path: string;
  label: string;
  liClasses: string;
};

export const renderMenuItem = ({ isAuthenticated, activeLinks }: MenuItemProps): MenuItem[] => {
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
          liClasses: 'row-start-2 col-start-1',
        },
        {
          path: '/read',
          label: 'Read',
          liClasses: 'row-start-3 col-start-1 lg:row-start-1 lg:col-start-2',
        },
        {
          path: '/archive',
          label: 'Archive',
          liClasses: 'row-start-4 col-start-1 lg:row-start-2 lg:col-start-2',
        },
        {
          path: '/account',
          label: 'Account',
          liClasses: 'row-start-1 col-start-2 text-end lg:row-start-1 lg:col-start-3',
        },
      ]
    : [
        {
          path: '/',
          label: 'Home',
          liClasses: '',
        },
      ];

  if (!activeLinks?.isAboutUs) {
    if (isAuthenticated) {
      menuItems.push({
        path: '/about-us',
        label: 'About Us',
        liClasses: 'row-start-2 col-start-2 text-end lg:row-start-2 lg:col-start-3',
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
