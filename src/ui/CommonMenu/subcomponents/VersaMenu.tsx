import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ICON_SIZES } from 'constants/iconSizes';
import { useHeaderStyles } from 'hooks';

import SvgIcon from '../../SvgIcon';

import { IMenuProps } from '../types';

const VersaMenu: FC<IMenuProps> = ({ navId, links, activeLinks, handleLinkClick }) => {
  const { textClass } = useHeaderStyles(activeLinks?.isHomeActive);

  return (
    <nav
      id={navId}
      className={`${
        navId === 'main-navigation'
          ? ''
          : 'after:mt-3 after:block after:h-px after:w-full after:bg-accentBase after:content-[""]'
      }`}
    >
      <ul
        className={`${
          navId === 'main-navigation' ? 'flex gap-5 md:gap-14 lg:gap-[69px]' : 'space-y-2'
        }`}
      >
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              onClick={handleLinkClick}
              className={`text-medium font-medium transition-colors duration-500 md:font-bold lg:text-xl ${
                navId === 'account-navigation'
                  ? 'group flex items-center py-1.5 text-darkBase hover:bg-accentBase hover:text-whiteBase  dark:text-whiteBase'
                  : `relative pb-8 pt-12 hover:text-accentBase lg:pb-[33px] lg:pt-[55px] ${
                      link.activeLink
                        ? 'after:content[""] text-accentBase after:absolute after:block after:h-px after:w-full after:bg-accentBase'
                        : activeLinks?.isHomeActive
                          ? textClass
                          : 'text-darkBase dark:text-whiteBase'
                    }`
              }   `}
            >
              <p
                className={`${navId === 'account-navigation' && 'flex items-center gap-3.5 px-2'}`}
              >
                {link.label}
              </p>
              {navId === 'account-navigation' && link.activeLink ? (
                <SvgIcon
                  svgName='icon-arrow-left'
                  size={ICON_SIZES.mdIcon24}
                  className='rotate-180 fill-darkBase group-hover:fill-whiteBase dark:fill-whiteBase'
                />
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default VersaMenu;
