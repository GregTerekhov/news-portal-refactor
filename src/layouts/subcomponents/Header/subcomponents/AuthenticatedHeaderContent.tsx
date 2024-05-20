import React, { FC } from 'react';

import { ButtonType, IconName, IconSizes, NavId, VariantSwitcher } from 'types';

import { useWindowWidthContext } from 'contexts';

import { SvgIcon, ThemeSwitcher } from 'ui';
import AuthButton from './Auth';
import UserAccountLink from './UserAccountLink';
import { CommonMenu } from '../..';

import { useActiveLinks, useHeaderStyles } from 'hooks';
import { getAriaLabel, getIconStyles, getNavId } from '../assistants';

interface IHeaderContentProps {
  resetFilters: () => void;
  isOpenMenu: boolean;
  toggleMenu: () => void;
}

const AuthenticatedHeaderContent: FC<IHeaderContentProps> = ({
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
            type={ButtonType.Button}
            className={isOpenMenu ? 'z-50' : 'h-6 w-6 md:hidden'}
            onClick={() => {
              toggleMenu();
              resetFilters();
            }}
          >
            <SvgIcon
              svgName={isOpenMenu ? IconName.Close : IconName.Burger}
              sizeKey={IconSizes.mdIcon24}
              className={iconClass}
            />
          </button>
        </div>
      ) : (
        <>
          {!isAccountPages ? <UserAccountLink isHomeActive={isHomeActive} /> : null}
          <CommonMenu navId={NavId.Main} />
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
