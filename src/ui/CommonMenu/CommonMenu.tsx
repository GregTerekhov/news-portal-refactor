import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAuthRedux, useFiltersAction } from 'reduxStore/hooks';

import { VariantSwitcher } from 'types';
import { useFiltersState, useNotification, useWindowWidth } from 'contexts';
import { useActiveLinks } from 'hooks';

import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

import { renderMenuItem } from './assistants';
import { MenuButtons, MobileContainer, MobileMenu, VersaMenu } from './subcomponents';

export interface CommonMenuProps {
  isOpen?: boolean | undefined;
  navId: string;
  closeMenu?: (() => void) | undefined;
}

export type MobileMenu = Omit<CommonMenuProps, 'navId'>;

const CommonMenu: FC<CommonMenuProps> = ({ isOpen, navId, closeMenu }) => {
  const { isMobile } = useWindowWidth();
  const { resetAllFilters } = useFiltersAction();
  const { setFilters } = useFiltersState();
  const { user, logout } = useAuthRedux();
  const { showToast } = useNotification();

  const activeLinks = useActiveLinks();

  const links = renderMenuItem({ activeLinks, navId });

  const handleLinkClick = () => {
    if (typeof closeMenu === 'function') {
      closeMenu();
    }

    if (navId === 'main-navigation') {
      resetAllFilters();
      setFilters({
        keyword: '',
        title: '',
        author: '',
        publisher: '',
        materialType: '',
        selectedFilterDate: {
          startDate: '',
          endDate: '',
        },
      });
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
        <MobileContainer isOpen={isOpen} navId={navId}>
          <MobileMenu navId={navId} links={links} handleLinkClick={handleLinkClick} />
          {navId === 'account-navigation' ? (
            <div className='flex justify-between'>
              <MenuButtons
                handleSignOut={handleSignOut}
                handleLinkClick={handleLinkClick}
                navId='account-navigation'
              />
            </div>
          ) : (
            <>
              <Link
                to='/account'
                className='text-end text-darkBase transition-colors duration-500 dark:text-whiteBase'
                onClick={closeMenu}
              >
                Your account, {user.name}
              </Link>
              <div className='flex justify-between'>
                <ThemeSwitcher variant={VariantSwitcher.Header} />
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
