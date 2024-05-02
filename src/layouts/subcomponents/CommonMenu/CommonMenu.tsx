import React, { FC } from 'react';

import { VariantSwitcher } from 'types';
import { useAuthRedux, useFiltersRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { useFiltersStateContext, useSelectedDateContext, useWindowWidthContext } from 'contexts';

import { useActiveLinks, useSignOut } from 'hooks';

import { ThemeSwitcher } from 'ui';
import {
  AdditionalContent,
  MobileContainer,
  MobileMenu,
  SignOutButton,
  VersaMenu,
} from './subcomponents';

import { renderMenuItem } from './assistants';

interface CommonMenuProps {
  isOpen?: boolean | undefined;
  navId: string;
  closeMenu?: (() => void) | undefined;
}

const CommonMenu: FC<CommonMenuProps> = ({ isOpen, navId, closeMenu }) => {
  const { isThirdPartyRegister } = useAuthRedux();
  const { resetAllFiltersResults, filteredNews } = useFiltersRedux();
  const { resetPreviousRequest, newsByCategory, newsByDate, newsByKeyword } = useNewsAPIRedux();

  const { isMobile } = useWindowWidthContext();
  const { resetFilters } = useFiltersStateContext();
  const { resetRequestDay } = useSelectedDateContext();

  const activeLinks = useActiveLinks();
  const { handleSignOut } = useSignOut(closeMenu);

  const links = renderMenuItem({ activeLinks, navId, isThirdPartyRegister });

  const { isHomeActive, isFavoriteActive, isReadActive } = activeLinks;

  //Функція обробки кліку по пунктам меню та скидання значень фільтрів та результатів фільтрації, якщо вони є
  const handleLinkClick = (): void => {
    if (typeof closeMenu === 'function') closeMenu();

    const shouldReset =
      (navId === 'main-navigation' &&
        isHomeActive &&
        (newsByCategory?.length > 0 || newsByDate?.length > 0 || newsByKeyword?.length > 0)) ||
      (filteredNews?.length > 0 && (isHomeActive || isFavoriteActive || isReadActive));

    if (shouldReset) {
      resetAllFiltersResults();
      resetFilters();
      resetRequestDay();
      resetPreviousRequest();
    }
  };

  return (
    <>
      {isMobile && isOpen ? (
        <MobileContainer isOpen={isOpen}>
          <MobileMenu navId={navId} links={links} handleLinkClick={handleLinkClick} />
          <AdditionalContent
            navId={navId}
            handleLinkClick={handleLinkClick}
            closeMenu={closeMenu}
          />
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
