import React, { FC, useState } from 'react';

import { VariantInputs, VariantSwitcher } from 'types';
import { useWindowWidthContext } from 'contexts';

import { useActiveLinks, useAdditionalRequest, useHeaderStyles } from 'hooks';

import { SvgIcon, ThemeSwitcher, UnverifiableInput } from 'ui';
import AuthButton from './Auth';
import CommonMenu from '../../CommonMenu/CommonMenu';
import UserAccountLink from './UserAccountLink';

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
  const [touched, setTouched] = useState<boolean>(false);
  const { isMobile } = useWindowWidthContext();

  const { query, onChangeInput, onHandleSearch } = useAdditionalRequest();
  const { isHomeActive, isAccountPage, isManageAccountPage } = useActiveLinks();
  const { burgerMenuButtonClass } = useHeaderStyles(isHomeActive);

  const isAccountPages = isAccountPage || isManageAccountPage;

  //Функція змінення стану показування/приховування інпуту пошуку по ключовому слову в хедері на мобільних девайсах
  const handleVisibilityChange = (): void => {
    setTouched(!touched);
  };

  //Функція визначення id для меню в залежності від розміщення
  const getNavId = (): string => {
    let id = '';

    switch (true) {
      case isAccountPages:
        id = 'account-navigation';
        break;
      case !isAccountPages:
        id = 'main-navigation';
        break;
      default:
        id = '';
        break;
    }

    return id;
  };

  return (
    <>
      {isMobile ? (
        <div className={`flex items-center ${isHomeActive ? 'gap-3.5' : ''}`}>
          {!isOpenMenu && isHomeActive ? (
            <search>
              <form onSubmit={(e) => onHandleSearch(e)} className='max-md:overflow-hidden'>
                <UnverifiableInput
                  inputData={{
                    name: 'query',
                    type: 'text',
                    value: query,
                    placeholder: 'Search |',
                  }}
                  svgName='search'
                  hasIcon={true}
                  variant={VariantInputs.Header}
                  hideInput={handleVisibilityChange}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeInput(event)}
                  touched={touched}
                />
              </form>
            </search>
          ) : null}
          <button
            aria-label={`${!isOpenMenu ? 'Open' : 'Close'} ${
              !isAccountPages ? 'mobile' : 'account'
            } menu button`}
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
              className={`hocus:stroke-accentBase dark:hocus:stroke-accentBase ${
                !isOpenMenu && isHomeActive
                  ? burgerMenuButtonClass
                  : 'stroke-darkBase hocus:stroke-accentBase dark:stroke-whiteBase '
              }`}
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
