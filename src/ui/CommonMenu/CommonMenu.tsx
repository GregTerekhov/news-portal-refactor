import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuthRedux, useFiltersAction } from 'reduxStore/hooks';

import { useWindowWidth } from 'contexts';
import { useActiveLinks } from 'hooks';

import ThemeSwitcher from '../ThemeSwitcher';

import { renderMenuItem } from './assistants';
import { MenuButtons, MobileContainer, MobileMenu, VersaMenu } from './subcomponents';

export interface CommonMenuProps {
  isOpen?: boolean | undefined;
  navId: string;
  closeMenu?: (() => void) | undefined;
}

export type MobileMenu = Omit<CommonMenuProps, 'navId'>;

const CommonMenu: FC<CommonMenuProps> = ({ isOpen, navId, closeMenu }) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { resetAllFilters, filteredNews } = useFiltersAction();
  const { user, logout } = useAuthRedux();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const links = renderMenuItem({ activeLinks, navId });

  const handleLinkClick = () => {
    if (typeof closeMenu === 'function') {
      closeMenu();
    }

    if (navId === 'main-navigation' && filteredNews && filteredNews?.length > 0) {
      resetAllFilters();
    }
  };

  const handleSignOut = () => {
    if (typeof closeMenu === 'function') {
      closeMenu();
    }
    logout();
    localStorage.clear();
  };

  const closeMenuByClickOnLink = () => {
    if (typeof closeMenu === 'function') {
      closeMenu();
    }
  };

  const isMobile = breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile;

  return (
    <>
      {isMobile ? (
        <MobileContainer isOpen={isOpen} navId={navId}>
          <MobileMenu navId={navId} links={links} handleLinkClick={handleLinkClick} />
          {navId === 'account-navigation' ? (
            <div className='flex justify-between'>
              <MenuButtons
                handleSignOut={handleSignOut}
                closeMenuByClickOnLink={closeMenuByClickOnLink}
                navId='account-navigation'
              />
            </div>
          ) : (
            <>
              <Link
                to='/account'
                className='text-darkBase dark:text-whiteBase text-end'
                onClick={closeMenu}
              >
                Your account, {user.name}
              </Link>
              <div className='flex justify-between'>
                <ThemeSwitcher />
                <MenuButtons handleSignOut={handleSignOut} navId='main-navigation' />
              </div>
            </>
          )}
        </MobileContainer>
      ) : (
        <>
          <VersaMenu
            navId={navId}
            links={links}
            handleLinkClick={handleLinkClick}
            activeLinks={activeLinks}
          />
          {navId === 'account-navigation' ? (
            <MenuButtons handleSignOut={handleSignOut} navId='account-navigation' />
          ) : null}
        </>
      )}
    </>
  );
};

export default CommonMenu;
