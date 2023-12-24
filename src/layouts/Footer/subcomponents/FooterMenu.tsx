import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useAuthRedux } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';

import { renderMenuItem } from '../assistants';

const FooterMenu = () => {
  const { isAuthenticated } = useAuthRedux();
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleScrollToTop();
  }, [location]);

  const menuItems = renderMenuItem({ isAuthenticated, activeLinks });

  // const isAuthenticated = true;

  return (
    <>
      <nav className={`${isAuthenticated ? 'w-full md:w-96 lg:w-[600px]' : 'mb-4 md:mb-10'}`}>
        <ul
          className={`${
            isAuthenticated
              ? 'grid max-md:grid-cols-3 md:grid-cols-2 grid-rows-3  gap-3'
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
