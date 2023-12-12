import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useHeaderStyles } from 'hooks';
import { ActiveLinks } from 'hooks/useActiveLinks';

import SvgIcon from '../../SvgIcon';

import { MenuItem } from '../assistants';

interface VersaMenuProps {
  navId: string;
  links: MenuItem[];
  handleLinkClick: () => void;
  activeLinks: ActiveLinks;
}

const VersaMenu: FC<VersaMenuProps> = ({ navId, links, activeLinks, handleLinkClick }) => {
  const { textClass } = useHeaderStyles(activeLinks.isHomeActive);
  return (
    <nav
      id={navId}
      className={`${
        navId === 'main-navigation'
          ? ''
          : 'after:content-[""] after:w-full after:h-px after:bg-accentBase after:block after:mt-3'
      }`}
    >
      <ul
        className={`${
          navId === 'main-navigation' ? 'flex gap-5 md:gap-14 lg:gap-[69px]' : 'space-y-2'
        }`}
      >
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              onClick={handleLinkClick}
              className={`font-medium md:font-bold text-medium lg:text-xl transition-colors duration-500 ${
                navId === 'account-navigation'
                  ? 'flex items-center group py-1.5 text-darkBase hover:text-whiteBase dark:text-whiteBase  hover:bg-accentBase'
                  : `relative pt-12 pb-8 lg:pt-[55px] lg:pb-[33px] hover:text-accentBase ${
                      link.activeLink
                        ? 'text-accentBase after:content[""] after:block after:absolute after:h-px after:w-full after:bg-accentBase'
                        : activeLinks.isHomeActive
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
                  size={24}
                  className='fill-darkBase dark:fill-whiteBase group-hover:fill-whiteBase rotate-180'
                />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default VersaMenu;
