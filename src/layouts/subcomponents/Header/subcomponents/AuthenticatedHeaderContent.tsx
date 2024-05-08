import React, { FC } from 'react';

import { VariantSwitcher } from 'types';
import { useWindowWidthContext } from 'contexts';

import { useActiveLinks, useHeaderStyles } from 'hooks';

import { SvgIcon, ThemeSwitcher } from 'ui';
import AuthButton from './Auth';
import UserAccountLink from './UserAccountLink';
import CommonMenu from '../../CommonMenu/CommonMenu';

import { getAriaLabel, getIconStyles, getNavId } from '../assistants';

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
  const { isSmallScreens } = useWindowWidthContext();

  const { isHomeActive, isAccountPage, isManageAccountPage } = useActiveLinks();
  const { burgerMenuButtonClass } = useHeaderStyles(isHomeActive);

  const isAccountPages = isAccountPage || isManageAccountPage;

  const ariaLabel = getAriaLabel(isOpenMenu, isAccountPages);
  const iconClass = getIconStyles(isOpenMenu, isHomeActive, burgerMenuButtonClass);

  return (
    <>
      {isSmallScreens ? (
        <div className={`flex items-center ${isHomeActive ? 'gap-3.5' : ''}`}>
          <button
            aria-label={`${ariaLabel} menu button`}
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
              className={iconClass}
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
      {isOpenMenu && (
        <CommonMenu isOpen={isOpenMenu} navId={getNavId(isAccountPages)} closeMenu={toggleMenu} />
      )}
    </>
  );
};

export default AuthenticatedHeaderContent;
