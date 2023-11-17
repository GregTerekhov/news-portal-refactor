import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';

import {
  useActiveLinks,
  useAuthCollector,
  useFilterCollector,
  useHeaderStyles,
  useWindowWidth,
} from 'hooks';

import { PrimaryButton, SvgIcon } from 'ui';

import ThemeSwitcher from './ThemeSwitcher';

interface MobileMenu {
  isOpen: boolean;
  closeMenu: () => void;
}

const modalRoot = document.querySelector('#modalRoot');

const Menu = ({ isOpen, closeMenu }: Partial<MobileMenu>) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { resetAllFilters } = useFilterCollector();
  const { user, logout } = useAuthCollector();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { textClass } = useHeaderStyles(activeLinks.isHomeActive);

  useEffect(() => {
    if (!modalRoot) {
      return;
    }
  }, []);

  const handleNavLinkClick = () => {
    if (typeof closeMenu === 'function') {
      closeMenu();
    }
  };

  const handleSignOut = () => {
    logout();
    localStorage.clear();
  };

  const links = [
    { path: '/', label: 'Home', icon: 'icon-home', activeLink: activeLinks.isHomeActive },
    {
      path: '/favourite',
      label: 'Favourite',
      icon: 'icon-heart-menu',
      activeLink: activeLinks.isFavoriteActive,
    },
    { path: '/read', label: 'Read', icon: 'icon-open-book', activeLink: activeLinks.isReadActive },
    {
      path: '/archive',
      label: 'Archive',
      icon: 'icon-archive',
      activeLink: activeLinks.isArchiveActive,
    },
  ];

  const shouldRenderPortal = breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile;

  return (
    <>
      {shouldRenderPortal ? (
        modalRoot &&
        createPortal(
          <div
            className={`fixed top-0 w-full h-full pb-[18px] pt-[147px] z-40 overflow-auto transition-all duration-500 bg-whiteBase dark:bg-darkBackground before:fixed before:content-[""] before:z-[8] before:h-[81px] before:top-0 before:left-0  ${
              isOpen ? 'left-0' : '-left-full'
            }`}
          >
            <div className='container mx-auto px-4 flex flex-col justify-between h-full'>
              <ul className='space-y-3'>
                {links.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      onClick={() => {
                        handleNavLinkClick();
                        resetAllFilters();
                      }}
                      className={`flex items-center py-1.5 font-medium md:font-bold text-medium lg:text-xl transition-colors duration-500 ${
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
                            className='stroke-whiteBase fill-transparent'
                          />
                        </div>
                        {link.label}
                      </div>
                      {link.activeLink && (
                        <SvgIcon
                          svgName='icon-arrow-right'
                          size={24}
                          className='stroke-whiteBase fill-transparent'
                        />
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Link to='/account' className='text-darkBase dark:text-whiteBase text-end'>
                Your account, {user.name}
              </Link>
              <div className='flex justify-between'>
                <ThemeSwitcher />
                <PrimaryButton
                  id='Sign out button'
                  classNameButton='border border-solid border-transparent dark:border-whiteBase'
                  hasIcon={true}
                  variant='OtherButton'
                  width='w-32'
                  svgName='icon-signout'
                  svgSize={24}
                  classNameIcon='fill-whiteBase'
                  onHandleClick={handleSignOut}
                >
                  Sign Out
                </PrimaryButton>
              </div>
            </div>
          </div>,
          modalRoot,
        )
      ) : (
        <ul className='flex gap-5 md:gap-14 lg:gap-[69px]'>
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={resetAllFilters}
                className={`relative pt-12 pb-8 lg:pt-[55px] lg:pb-[33px] hover:text-accentBase font-medium md:font-bold text-medium lg:text-xl md:text-medium transition-colors duration-500 ${
                  link.activeLink
                    ? 'text-accentBase after:content[""] after:block after:absolute after:h-px after:w-full after:bg-accentBase'
                    : activeLinks.isHomeActive
                    ? textClass
                    : 'text-darkBase dark:text-whiteBase'
                }`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Menu;
