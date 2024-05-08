import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import type { IMenuProps } from 'types';
import { useHeaderStyles } from 'hooks';

import { SvgIcon } from 'ui';
import { getNavLinkVersaStyles } from '../assistants';

const VersaMenu: FC<IMenuProps> = ({ navId, links, isHomeActive, handleLinkClick }) => {
  const { textClass } = useHeaderStyles(isHomeActive);

  const linksListStyles = `${
    navId === 'main-navigation' ? 'flex gap-5 md:gap-14 lg:gap-[69px]' : 'space-y-2'
  }`;

  return (
    <nav id={navId}>
      <ul className={linksListStyles}>
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              onClick={handleLinkClick}
              className={getNavLinkVersaStyles(link.activeLink, isHomeActive, navId, textClass)}
            >
              {link.label}
              {navId === 'account-navigation' && link.activeLink ? (
                <SvgIcon
                  svgName='arrow'
                  sizeKey='xsIcon14'
                  className='-rotate-90 fill-darkBase group-hover:fill-whiteBase group-focus:fill-whiteBase dark:fill-whiteBase'
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
