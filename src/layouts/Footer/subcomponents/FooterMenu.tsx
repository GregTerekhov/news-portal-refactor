import React, { FC, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useAuthRedux } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';

import { renderMenuItem } from '../assistants';

const FooterMenu: FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthRedux();

  const { isAboutUs } = useActiveLinks();

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleScrollToTop();
  }, [location]);

  const menuItems = renderMenuItem({ isAuthenticated, isAboutUs });

  return (
    <>
      <nav className='mb-8 w-full md:mb-10'>
        <ul
          className={`${
            isAuthenticated
              ? 'grid grid-rows-2 gap-3 max-md:grid-cols-3 md:grid-cols-6 md:grid-rows-1'
              : 'flex items-center justify-between'
          }`}
        >
          {menuItems &&
            menuItems.map(({ path, label, liClasses }) => (
              <li key={path} className={`${liClasses} md:text-center`}>
                <NavLink
                  to={path}
                  className={`p-2 text-medium font-medium text-whiteBase lg:text-2xl ${
                    isAuthenticated
                      ? 'hocus:underline'
                      : 'hocus:bg-accentAlt block w-24 rounded-xl border border-solid border-whiteBase text-center transition-colors duration-500 lg:w-32'
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
