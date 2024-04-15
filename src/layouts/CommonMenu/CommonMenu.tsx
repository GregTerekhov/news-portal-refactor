import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { VariantSwitcher } from 'types';
import { useAuthRedux, useFiltersRedux } from 'reduxStore/hooks';
import { useFiltersStateContext, useWindowWidthContext } from 'contexts';

import { useActiveLinks, useSignOut } from 'hooks';

import { ThemeSwitcher } from 'ui';
import { MenuLinks, MobileContainer, MobileMenu, SignOutButton, VersaMenu } from './subcomponents';

import { renderMenuItem } from './assistants';

export interface CommonMenuProps {
  isOpen?: boolean | undefined;
  navId: string;
  closeMenu?: (() => void) | undefined;
}

export type MobileMenu = Omit<CommonMenuProps, 'navId'>;

const CommonMenu: FC<CommonMenuProps> = ({ isOpen, navId, closeMenu }) => {
  const { resetAllFiltersResults } = useFiltersRedux();
  const { user } = useAuthRedux();

  const { isMobile } = useWindowWidthContext();
  const { resetFilters } = useFiltersStateContext();

  const activeLinks = useActiveLinks();
  const { handleSignOut } = useSignOut(closeMenu);

  const links = renderMenuItem({ activeLinks, navId });

  //Функція обробки кліку по пунктам меню та скидання значень фільтрів та результатів фільтрації, якщо вони є
  const handleLinkClick = (): void => {
    if (typeof closeMenu === 'function') {
      closeMenu();
    }

    if (navId === 'main-navigation') {
      resetAllFiltersResults();
      resetFilters();
    }
  };

  const renderMenuContent = (): JSX.Element => {
    return navId === 'account-navigation' ? (
      <div>
        <p className='mb-2 text-darkBase dark:text-whiteBase'>Main Menu</p>
        <hr className='mb-4 !border-accentBase' />
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
    );
  };

  return (
    <>
      {isMobile && isOpen ? (
        <MobileContainer isOpen={isOpen}>
          <MobileMenu navId={navId} links={links} handleLinkClick={handleLinkClick} />
          {renderMenuContent()}
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
          {navId === 'account-navigation' ? (
            <>
              <hr className='!border-greyAlt transition-colors duration-500 dark:!border-accentBase' />
              <SignOutButton handleSignOut={handleSignOut} />
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default CommonMenu;
