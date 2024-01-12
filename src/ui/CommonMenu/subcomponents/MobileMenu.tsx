import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import SvgIcon from '../../SvgIcon';

import { IMenuProps } from '../types';

const MobileMenu: FC<IMenuProps> = ({ navId, links, handleLinkClick }) => {
  return (
    <nav id={navId}>
      <ul
        className={`space-y-3 ${
          navId === 'account-navigation' &&
          'after:content-[""] after:w-full after:h-px after:bg-accentBase after:block after:mt-3'
        }`}
      >
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              onClick={handleLinkClick}
              className={`flex items-center p-1.5 font-medium md:font-bold text-medium lg:text-xl transition-colors duration-500 ${
                link.activeLink
                  ? 'bg-accentBase text-whiteBase justify-between [clip-path:inset(0 -100vmax)]'
                  : 'text-darkBase dark:text-whiteBase'
              }`}
            >
              <div className='flex items-center gap-3.5'>
                <div
                  className={`bg-accentBase rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-500 ${
                    link.activeLink && 'outline outline-1 outline-whiteBase'
                  }`}
                >
                  <SvgIcon
                    svgName={link.icon}
                    size={18}
                    className={`${
                      navId === 'main-navigation'
                        ? 'stroke-whiteBase fill-transparent'
                        : 'fill-whiteBase'
                    }`}
                  />
                </div>
                {link.label}
              </div>
              {link.activeLink && (
                <SvgIcon
                  svgName='icon-arrow-left'
                  size={24}
                  className='fill-whiteBase rotate-180'
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
