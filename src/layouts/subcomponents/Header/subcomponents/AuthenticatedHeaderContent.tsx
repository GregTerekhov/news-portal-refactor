import React, { FC } from 'react';

import { VariantSwitcher } from 'types';
import { useWindowWidthContext } from 'contexts';

import { useActiveLinks, useHeaderStyles } from 'hooks';

import { SvgIcon, ThemeSwitcher } from 'ui';
import AuthButton from './Auth';
import UserAccountLink from './UserAccountLink';
import CommonMenu from '../../CommonMenu/CommonMenu';

interface HeaderContentProps {
  resetFilters: () => void;
  isOpenMenu: boolean;
  toggleMenu: () => void;
}

const AuthenticatedHeaderContent: FC<HeaderContentProps> = ({
  resetFilters,
  isOpenMenu,
  toggleMenu,
}) => {
  const { isMobile } = useWindowWidthContext();

  const { isHomeActive, isAccountPage, isManageAccountPage } = useActiveLinks();
  const { burgerMenuButtonClass } = useHeaderStyles(isHomeActive);

  const isAccountPages = isAccountPage || isManageAccountPage;

  //Функція визначення id для меню в залежності від розміщення
  const getNavId = (): string => {
    return isAccountPages ? 'account-navigation' : 'main-navigation';
  };

  const getAriaLabel = (): string => {
    return (
      (!isOpenMenu ? 'Open ' : 'Close ') +
      (!isAccountPages ? 'mobile ' : 'account ') +
      'menu button'
    );
  };

  const iconStyles = `hocus:stroke-accentBase dark:hocus:stroke-accentBase ${
    !isOpenMenu && isHomeActive
      ? burgerMenuButtonClass
      : 'stroke-darkBase hocus:stroke-accentBase dark:stroke-whiteBase '
  }`;

  return (
    <>
      {isMobile ? (
        <div className={`flex items-center ${isHomeActive ? 'gap-3.5' : ''}`}>
          <button
            aria-label={getAriaLabel()}
            type='button'
            className={`${isOpenMenu ? 'z-50' : 'h-6 w-6 md:hidden'}`}
            onClick={() => {
              toggleMenu();
              resetFilters();
            }}
          >
            <SvgIcon
              svgName={`${isOpenMenu ? 'close' : 'burger-menu'}`}
              sizeKey='mdIcon24'
              className={iconStyles}
            />
          </button>
        </div>
      ) : (
        <>
          {!isAccountPages ? <UserAccountLink isHomeActive={isHomeActive} /> : null}
          <CommonMenu navId='main-navigation' />
          <div className='flex flex-col gap-3'>
            {!isAccountPages && <AuthButton />}
            <ThemeSwitcher variant={VariantSwitcher.Header} />
          </div>
        </>
      )}
      {isOpenMenu && <CommonMenu isOpen={isOpenMenu} navId={getNavId()} closeMenu={toggleMenu} />}
    </>
  );
};

export default AuthenticatedHeaderContent;
