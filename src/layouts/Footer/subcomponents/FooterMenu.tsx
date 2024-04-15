import React, { FC, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useAuthRedux } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';
import { renderMenuItem } from '../assistants';

const FooterMenu: FC = () => {
  const { isAuthenticated } = useAuthRedux();
  const { isAboutUs } = useActiveLinks();
  const location = useLocation();

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleScrollToTop();
  }, [location]);

  const menuItems = renderMenuItem({ isAuthenticated, isAboutUs });

  const getElementStyles = () => {
    let listStyles = '';
    let linkStyles = '';

    switch (true) {
      case isAuthenticated:
        listStyles = 'grid grid-rows-2 gap-3 max-md:grid-cols-3 md:grid-cols-6 md:grid-rows-1';
        linkStyles = 'hocus:underline';
        break;
      case !isAuthenticated:
        listStyles = 'flex items-center justify-between';
        linkStyles =
          'block w-24 rounded-xl border border-solid border-whiteBase text-center transition-colors duration-500 hocus:bg-accentAlt lg:w-32';
        break;

      default:
        break;
    }
    return { listStyles, linkStyles };
  };

  const linkStyles = `p-2 text-medium font-medium text-whiteBase lg:text-2xl ${getElementStyles().linkStyles}`;

  return (
    <>
      <nav className='mb-8 w-full md:mb-10'>
        <ul className={getElementStyles().listStyles}>
          {menuItems &&
            menuItems.map(({ path, label, liClasses }) => (
              <li key={path} className={`${liClasses} md:text-center`}>
                <NavLink to={path} className={`${linkStyles}`}>
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
