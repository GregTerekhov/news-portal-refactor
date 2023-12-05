import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useActiveLinks, useAuthCollector } from 'hooks';

const FooterMenu = () => {
  // const { isAuthenticated } = useAuthCollector();
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const isAuthenticated = true;

  const menuItems: { path: string; label: string; liClasses: string }[] = isAuthenticated
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

  if (!activeLinks.isAboutUs) {
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

  return (
    <>
      <nav className={`${isAuthenticated ? 'w-full lg:w-2/5' : 'mb-4 md:mb-10'}`}>
        <ul
          className={`${
            isAuthenticated
              ? 'grid grid-cols-2 grid-rows-4 gap-3 lg:grid-cols-3 lg:grid-rows-2'
              : 'flex justify-between items-center'
          }`}
        >
          {menuItems &&
            menuItems.map(({ path, label, liClasses }) => (
              <li key={path} className={`${liClasses}`}>
                <NavLink
                  to={path}
                  className={`p-2 text-medium font-medium text-whiteBase ${
                    isAuthenticated
                      ? ''
                      : 'block w-24 text-center border border-solid border-whiteBase rounded-xl'
                  }`}
                >
                  {label}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default FooterMenu;
