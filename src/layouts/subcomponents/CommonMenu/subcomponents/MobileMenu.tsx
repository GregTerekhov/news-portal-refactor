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

  const listClass = getMobileLinksListStyles(navId);
  const iconClass = getMobileIconStyles(navId);

  return (
    <nav
      id={navId}
      className={isThirdPartyRegister && navId !== 'main-navigation' ? 'hidden' : 'block'}
    >
      <ul className={listClass}>
        {links.map(({ path, activeLink, icon, label }) => (
          <li key={path}>
            <NavLink to={path} onClick={handleLinkClick} className={getNavLinkStyles(activeLink)}>
              <div className='flex items-center gap-3.5'>
                <div className={getSvgWrapperStyles(activeLink)}>
                  <SvgIcon svgName={icon} sizeKey='smIcon18' className={iconClass} />
                </div>
                {label}
              </div>
              {activeLink && (
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
