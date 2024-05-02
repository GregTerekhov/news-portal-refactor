import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import type { IMenuProps } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';

import { SvgIcon } from 'ui';
import {
  getMobileIconStyles,
  getMobileLinksListStyles,
  getNavLinkStyles,
  getSvgWrapperStyles,
} from '../assistants';

const MobileMenu: FC<IMenuProps> = ({ navId, links, handleLinkClick }) => {
  const { isThirdPartyRegister } = useAuthRedux();

  return (
    <nav
      id={navId}
      className={`${isThirdPartyRegister && navId !== 'main-navigation' ? 'hidden' : 'block'}`}
    >
      <ul className={getMobileLinksListStyles(navId)}>
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
                    className={getMobileIconStyles(navId)}
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
