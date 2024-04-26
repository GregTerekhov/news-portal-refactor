import React, { FC, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useAuthRedux } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';
import { getElementStyles, renderMenuItem } from '../assistants';

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

  const { linkStyles: menuLinkStyles, listStyles } = getElementStyles(isAuthenticated);

  const linkStyles = `p-2 text-medium font-medium text-whiteBase lg:text-2xl ${menuLinkStyles}`;

  return (
    <>
      <nav className='mb-8 w-full md:mb-10'>
        <ul className={listStyles}>
          {menuItems &&
            menuItems.map(({ path, label, liClasses }) => (
              <li key={path} className={`${liClasses} md:text-center`}>
                <NavLink to={path} className={linkStyles}>
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
