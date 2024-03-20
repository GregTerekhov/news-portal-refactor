import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IMenuProps } from 'types';
import { useHeaderStyles } from 'hooks';

import { SvgIcon } from 'ui';

const VersaMenu: FC<IMenuProps> = ({ navId, links, activeLinks, handleLinkClick }) => {
  const { textClass } = useHeaderStyles(activeLinks?.isHomeActive);

  const getNavLinkStyles = (isActiveLink: boolean | undefined) => {
    return `text-medium font-medium transition-colors duration-500 md:font-bold lg:text-xl hg:text-3xl ${
      navId === 'account-navigation'
        ? 'group flex items-center gap-3.5 px-2 py-1.5 text-darkBase hover:bg-accentBase hover:text-whiteBase  dark:text-whiteBase'
        : `relative pb-8 pt-12 hover:text-accentBase lg:pb-[33px] lg:pt-[55px] ${
            isActiveLink
              ? 'after:content[""] text-accentBase after:absolute after:block after:h-px after:w-full after:bg-accentBase'
              : activeLinks?.isHomeActive
                ? textClass
                : 'text-darkBase dark:text-whiteBase'
          }`
    }`;
  };

  const navStyles = `${
    navId === 'main-navigation'
      ? ''
      : 'after:mt-3 after:block after:h-px after:w-full after:bg-accentBase after:content-[""]'
  }`;

  const linksListStyles = `${
    navId === 'main-navigation' ? 'flex gap-5 md:gap-14 lg:gap-[69px]' : 'space-y-2'
  }`;

  return (
    <nav id={navId} className={`${navStyles}`}>
      <ul className={`${linksListStyles}`}>
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              onClick={handleLinkClick}
              className={getNavLinkStyles(link.activeLink)}
            >
              {link.label}
              {navId === 'account-navigation' && link.activeLink ? (
                <SvgIcon
                  svgName='arrow'
                  sizeKey='xsIcon14'
                  className='-rotate-90 fill-darkBase group-hover:fill-whiteBase dark:fill-whiteBase'
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
