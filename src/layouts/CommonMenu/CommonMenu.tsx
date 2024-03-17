import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAuthRedux, useFiltersAction } from 'reduxStore/hooks';

import { VariantSwitcher } from 'types';
import { useFiltersState, useNotification, useWindowWidth } from 'contexts';
import { useActiveLinks } from 'hooks';

import { ThemeSwitcher } from 'ui';

import { renderMenuItem } from './assistants';
import { MenuLinks, MobileContainer, MobileMenu, SignOutButton, VersaMenu } from './subcomponents';

export interface CommonMenuProps {
  isOpen?: boolean | undefined;
  navId: string;
  closeMenu?: (() => void) | undefined;
}

export type MobileMenu = Omit<CommonMenuProps, 'navId'>;

const CommonMenu: FC<CommonMenuProps> = ({ isOpen, navId, closeMenu }) => {
  const { isMobile } = useWindowWidth();
  const { resetAllFiltersResults } = useFiltersAction();
  const { resetFilters } = useFiltersState();
  const { user, logout } = useAuthRedux();
  const { showToast } = useNotification();

  const activeLinks = useActiveLinks();

  const links = renderMenuItem({ activeLinks, navId });

  const handleLinkClick = () => {
    if (typeof closeMenu === 'function') {
      closeMenu();
    }

    if (navId === 'main-navigation') {
      resetAllFiltersResults();
      resetFilters();
    }
  };

  const handleSignOut = async () => {
    if (typeof closeMenu === 'function') {
      closeMenu();
    }
    const response = await logout();

    showToast(response.meta.requestStatus);
    localStorage.removeItem('_persist');
  };

  return (
    <>
      {isMobile && isOpen ? (
        <MobileContainer isOpen={isOpen}>
          <MobileMenu navId={navId} links={links} handleLinkClick={handleLinkClick} />
          {navId === 'account-navigation' ? (
            <div>
              <p className='mb-2 text-darkBase dark:text-whiteBase'>Main Menu</p>
              <hr className='mb-4 bg-accentBase' />
              <div className='grid grid-cols-2 grid-rows-2 gap-3'>
                <MenuLinks handleLinkClick={handleLinkClick} />
              </div>
            </div>
          ) : (
            <Link
              to='/account'
              className='text-end text-darkBase transition-colors duration-500 dark:text-whiteBase'
              onClick={closeMenu}
            >
              Your account, {user.name}
            </Link>
          )}
          <div className='flex justify-between'>
            <ThemeSwitcher variant={VariantSwitcher.Header} />
            <SignOutButton handleSignOut={handleSignOut} />
          </div>
        </MobileContainer>
      ) : (
        <>
          <VersaMenu
            navId={navId}
            links={links}
            handleLinkClick={handleLinkClick}
            activeLinks={activeLinks}
          />
          {navId === 'account-navigation' ? <SignOutButton handleSignOut={handleSignOut} /> : null}
        </>
      )}
    </>
  );
};

export default CommonMenu;
