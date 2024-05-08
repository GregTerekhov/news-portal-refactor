import React, { FC } from 'react';

import { NavId, VariantSwitcher } from 'types';
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
  navId: NavId;
  closeMenu?: (() => void) | undefined;
}

const CommonMenu: FC<CommonMenuProps> = ({ isOpen, navId, closeMenu }) => {
  const { isThirdPartyRegister } = useAuthRedux();
  const { resetAllFiltersResults, filteredNews } = useFiltersRedux();
  const { resetPreviousRequest, newsByCategory, newsByDate, newsByKeyword } = useNewsAPIRedux();

  const { isSmallScreens } = useWindowWidthContext();
  const { resetFiltersState } = useFiltersStateContext();
  const { resetRequestDay } = useSelectedDateContext();

  const activeLinks = useActiveLinks();
  const { handleSignOut } = useSignOut(closeMenu);

  const links = renderMenuItem({ activeLinks, navId, isThirdPartyRegister });

  const { isHomeActive, isFavoriteActive, isReadActive } = activeLinks;

  const pagesWithFilters = isHomeActive || isFavoriteActive || isReadActive;
  const additionalRequestResults =
    newsByCategory?.length > 0 || newsByDate?.length > 0 || newsByKeyword?.length > 0;
  const shouldReset =
    (navId === 'main-navigation' && isHomeActive && additionalRequestResults) ||
    (filteredNews?.length > 0 && pagesWithFilters);

  //Функція обробки кліку по пунктам меню та скидання значень фільтрів та результатів фільтрації, якщо вони є
  const handleLinkClick = (): void => {
    if (typeof closeMenu === 'function') closeMenu();

    if (shouldReset) {
      resetAllFiltersResults();
      resetFiltersState();
      resetRequestDay();
      resetPreviousRequest();
    }
  };

  return (
    <>
      {isSmallScreens && isOpen ? (
        <MobileContainer isOpen={isOpen}>
          <MobileMenu
            navId={navId}
            links={links}
            isHomeActive={false}
            handleLinkClick={handleLinkClick}
          />
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
            isHomeActive={isHomeActive}
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
