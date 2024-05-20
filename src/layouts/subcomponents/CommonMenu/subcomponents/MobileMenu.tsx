import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IconName, IconSizes, NavId, type IMenuProps } from 'types';

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
    <nav id={navId} className={isThirdPartyRegister && navId !== NavId.Main ? 'hidden' : 'block'}>
      <ul className={listClass}>
        {Array.isArray(links) &&
          links.map(({ path, activeLink, icon, label }) => (
            <li key={path}>
              <NavLink to={path} onClick={handleLinkClick} className={getNavLinkStyles(activeLink)}>
                <div className='flex items-center gap-3.5'>
                  <div className={getSvgWrapperStyles(activeLink)}>
                    <SvgIcon svgName={icon} sizeKey={IconSizes.smIcon18} className={iconClass} />
                  </div>
                  {label}
                </div>
                {activeLink && (
                  <SvgIcon
                    svgName={IconName.Arrow}
                    sizeKey={IconSizes.xsIcon14}
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
