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
          liClasses: 'row-start-1 col-start-2 md:col-start-1 md:row-start-3',
        },
        {
          path: '/archive',
          label: 'Archive',
          liClasses: 'row-start-2 col-start-2 md:col-start-2 md:row-start-1 md:text-end',
        },
        {
          path: '/account',
          label: 'Account',
          liClasses: 'row-start-1 col-start-3 md:col-start-2 md:row-start-2 text-end',
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
        liClasses: 'row-start-2 col-start-3 md:col-start-2 md:row-start-3 text-end',
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
