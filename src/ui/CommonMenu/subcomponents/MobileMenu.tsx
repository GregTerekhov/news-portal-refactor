import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IMenuProps } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';

import SvgIcon from '../../SvgIcon';

const MobileMenu: FC<IMenuProps> = ({ navId, links, handleLinkClick }) => {
  return (
    <nav id={navId}>
      <ul
        className={`space-y-3 ${
          navId === 'account-navigation' &&
          'after:mt-3 after:block after:h-px after:w-full after:bg-accentBase after:content-[""]'
        }`}
      >
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              onClick={handleLinkClick}
              className={`flex items-center p-1.5 text-medium font-medium transition-colors duration-500 md:font-bold lg:text-xl ${
                link.activeLink
                  ? '[clip-path:inset(0 -100vmax)] justify-between bg-accentBase text-whiteBase'
                  : 'text-darkBase dark:text-whiteBase'
              }`}
            >
              <div className='flex items-center gap-3.5'>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-accentBase transition-colors duration-500 ${
                    link.activeLink && 'outline outline-1 outline-whiteBase'
                  }`}
                >
                  <SvgIcon
                    svgName={link.icon}
                    size={ICON_SIZES.smIcon18}
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
                <SvgIcon
                  svgName='icon-arrow'
                  size={ICON_SIZES.xsIcon14}
                  className='-rotate-90 fill-whiteBase'
                />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
