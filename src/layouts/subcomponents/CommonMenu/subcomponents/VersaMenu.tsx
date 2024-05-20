import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IconName, IconSizes, NavId, type IMenuProps } from 'types';

import { SvgIcon } from 'ui';

import { useHeaderStyles } from 'hooks';
import { getNavLinkVersaStyles } from '../assistants';

const VersaMenu: FC<IMenuProps> = ({ navId, links, isHomeActive, handleLinkClick }) => {
  const { textClass } = useHeaderStyles(isHomeActive);

  const linksListStyles = `${
    navId === NavId.Main ? 'flex gap-5 md:gap-14 lg:gap-[69px]' : 'space-y-2'
  }`;

  return (
    <nav id={navId}>
      <ul className={linksListStyles}>
        {Array.isArray(links) &&
          links.map(({ path, label, activeLink }) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={handleLinkClick}
                className={getNavLinkVersaStyles(activeLink, isHomeActive, navId, textClass)}
              >
                {label}
                {navId === NavId.Account && activeLink ? (
                  <SvgIcon
                    svgName={IconName.Arrow}
                    sizeKey={IconSizes.xsIcon14}
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
