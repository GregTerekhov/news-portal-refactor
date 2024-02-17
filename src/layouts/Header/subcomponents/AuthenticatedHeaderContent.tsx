import React, { FC } from 'react';

import { VariantInputs, VariantSwitcher } from 'types';

import { ICON_SIZES } from 'constants/iconSizes';
import { useWindowWidth } from 'contexts';
import { useActiveLinks, useAdditionalRequest, useHeaderStyles, usePopUp } from 'hooks';

import { SvgIcon, ThemeSwitcher, UnverifiableInput } from 'ui';
import AuthButton from './Auth';

interface HeaderContentProps {
  touched: boolean;
  handleVisibilityChange: () => void;
  resetFilters: () => void;
}

const AuthenticatedHeaderContent: FC<HeaderContentProps> = ({
  handleVisibilityChange,
  touched,
  resetFilters,
}) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { query, onChangeInput, onHandleSearch } = useAdditionalRequest();
  const { isOpenMenu, toggleMenu } = usePopUp();
  const { isHomeActive, isAccountPage, isManageAccountPage } = useActiveLinks();
  const { burgerMenuButtonClass } = useHeaderStyles(isHomeActive);

  const isAccountPages = isAccountPage || isManageAccountPage;

  return (
    <>
      <div className='flex items-center gap-3.5 lg:gap-12'>
        {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
          <>
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
                    svgName='icon-search'
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
              className='h-6 w-6 md:hidden'
              onClick={() => {
                toggleMenu();
                resetFilters();
              }}
            >
              <SvgIcon
                svgName={`${isOpenMenu ? 'icon-close' : 'icon-burger-menu'}`}
                size={ICON_SIZES.mdIcon24}
                className={`${
                  !isOpenMenu && isHomeActive
                    ? burgerMenuButtonClass
                    : 'stroke-darkBase dark:stroke-whiteBase'
                }`}
              />
            </button>
          </>
        ) : (
          <div className='flex flex-col gap-3'>
            {!isAccountPages && <AuthButton />}
            <ThemeSwitcher variant={VariantSwitcher.Header} />
          </div>
        )}
      </div>
    </>
  );
};

export default AuthenticatedHeaderContent;
