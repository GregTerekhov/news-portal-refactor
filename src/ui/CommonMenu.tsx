import React, { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import {
  useActiveLinks,
  useAuthCollector,
  useFilterCollector,
  useHeaderStyles,
  useWindowWidth,
} from 'hooks';

import { PrimaryButton, SvgIcon } from 'ui';
import { ThemeSwitcher } from 'components';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  activeLink: boolean;
}

enum NavIDVariants {
  AccountNav = 'account-navigation',
  SiteNav = 'main-navigation',
}

interface CommonMenuProps {
  isOpen: boolean | undefined;
  links: MenuItem[];
  navId: string;
  closeMenu: (() => void) | undefined;
}

const CommonMenu: FC<CommonMenuProps> = ({ isOpen, links, navId, closeMenu }) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { resetAllFilters } = useFilterCollector();
  const { user, logout } = useAuthCollector();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { textClass } = useHeaderStyles(activeLinks.isHomeActive);

  const handleLinkClick = () => {
    if (typeof closeMenu === 'function') {
      closeMenu();
    }

    if (navId === 'main-navigation') {
      resetAllFilters();
    }
  };

  const handleSignOut = () => {
    logout();
    localStorage.clear();
  };

  return (
    <>
      {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
        <div
          className={`fixed top-0 z-40 pb-[18px] pt-[147px] before:fixed before:content-[""] before:z-[8] before:w-full before:h-[81px] before:top-0 before:left-0 overflow-auto transition-all duration-500 bg-whiteBase dark:bg-darkBackground w-screen h-screen ${
            isOpen ? 'left-0' : '-left-full'
          }`}
        >
          <div className='container mx-auto px-4'>
            <nav
              id={navId}
              className={`${
                NavIDVariants.SiteNav ? 'flex flex-col justify-between h-full' : 'space-y-6'
              }`}
            >
              <ul
                className={`space-y-3 ${
                  NavIDVariants.AccountNav &&
                  'after:content-[""] after:w-full after:h-px after:bg-accentBase after:block after:mt-3'
                }`}
              >
                {links.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      onClick={handleLinkClick}
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
                            className={`${
                              NavIDVariants.SiteNav
                                ? 'stroke-whiteBase fill-transparent'
                                : 'fill-whiteBase'
                            }`}
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
            </nav>
            {NavIDVariants.AccountNav ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      ) : (
        <>
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
                    <div
                      className={`${navId === 'account-navigation' && 'flex items-center gap-3.5'}`}
                    >
                      {link.label}
                    </div>
                    {navId === 'account-navigation' && link.activeLink ? (
                      <SvgIcon
                        svgName='icon-arrow-right'
                        size={24}
                        className='stroke-darkBase dark:stroke-whiteBase group-hover:stroke-whiteBase group-hover:fill-none fill-transparent'
                      />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {navId === 'account-navigation' ? (
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
          ) : null}
        </>
      )}
    </>
  );
};

export default CommonMenu;
