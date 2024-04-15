import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import type { IMenuProps } from 'types';

import { SvgIcon } from 'ui';
import { getNavLinkStyles, getSvgWrapperStyles } from '../assistants';

const MobileMenu: FC<IMenuProps> = ({ navId, links, handleLinkClick }) => {
  const linksListStyles = `space-y-3 ${
    navId === 'account-navigation' &&
    'after:mt-3 after:block after:h-px after:w-full after:bg-accentBase after:content-[""]'
  }`;

  const iconStyles = `${
    navId === 'main-navigation' ? 'fill-transparent stroke-whiteBase' : 'fill-whiteBase'
  }`;

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
                  <SvgIcon svgName={link.icon} sizeKey='smIcon18' className={iconStyles} />
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
