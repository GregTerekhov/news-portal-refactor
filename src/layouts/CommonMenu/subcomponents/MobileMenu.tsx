import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import type { IMenuProps } from 'types';

import { SvgIcon } from 'ui';

const MobileMenu: FC<IMenuProps> = ({ navId, links, handleLinkClick }) => {
  const getNavLinkStyles = (isActiveLink: boolean | undefined) => {
    return `flex items-center p-1.5 text-medium font-medium transition-colors duration-500 md:font-bold lg:text-xl ${
      isActiveLink
        ? '[clip-path:inset(0 -100vmax)] justify-between bg-accentBase text-whiteBase'
        : 'text-darkBase dark:text-whiteBase'
    }`;
  };

  const linksListStyles = `space-y-3 ${
    navId === 'account-navigation' &&
    'after:mt-3 after:block after:h-px after:w-full after:bg-accentBase after:content-[""]'
  }`;

  const getSvgWrapperStyles = (isActiveLink: boolean | undefined) => {
    return `flex h-8 w-8 items-center justify-center rounded-full bg-accentBase transition-colors duration-500 ${
      isActiveLink ? 'outline outline-1 outline-whiteBase' : ''
    }`;
  };

  return (
    <nav id={navId}>
      <ul className={`${linksListStyles}`}>
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              onClick={handleLinkClick}
              className={getNavLinkStyles(link.activeLink)}
            >
              <div className='flex items-center gap-3.5'>
                <div className={getSvgWrapperStyles(link.activeLink)}>
                  <SvgIcon
                    svgName={link.icon}
                    sizeKey='smIcon18'
                    className={`${
                      navId === 'main-navigation'
                        ? 'fill-transparent stroke-whiteBase'
                        : 'fill-whiteBase'
                    }`}
                  />
                </div>
                {link.label}
              </div>
              {link.activeLink && (
                <SvgIcon svgName='arrow' sizeKey='xsIcon14' className='-rotate-90 fill-whiteBase' />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
