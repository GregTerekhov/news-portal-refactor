import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useActiveLinks, useAuthCollector } from 'hooks';

import { renderMenuItem } from '../assistants';

const FooterMenu = () => {
  const { isAuthenticated } = useAuthCollector();
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const menuItems = renderMenuItem({ isAuthenticated, activeLinks });

  // const isAuthenticated = true;

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
