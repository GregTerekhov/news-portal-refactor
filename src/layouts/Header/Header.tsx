import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { useAuthRedux, useFiltersAction } from 'reduxStore/hooks';

import { VariantInputs, VariantModals, VariantSwitcher } from 'types';
import { useWindowWidth } from 'contexts';
import { useActiveLinks, useAdditionalRequest, useHeaderStyles, usePopUp } from 'hooks';

import { AuthModal } from 'components';
import { Modal, SvgIcon, ThemeSwitcher, UnverifiableInput } from 'ui';

import { AuthButton, MainMenu } from './subcomponents';
import { AccountMenu } from '../subcomponents';

const Header: FC<{}> = () => {
  const [touched, setTouched] = useState<boolean>(false);
  const [passwordToken, setPasswordToken] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const openModal = searchParams.get('openModal');

  const { isOpenMenu, isOpenModal, setIsOpenModal, toggleMenu, toggleModal, popUpRef } = usePopUp();
  const { isAuthenticated, user, writeTokens } = useAuthRedux();

  useEffect(() => {
    console.log('openModal', openModal);
    if (!user && token && openModal) {
      setPasswordToken(true);
      writeTokens({ accessToken: token, refreshToken: null });
      setIsOpenModal(true);
    }
    // setPasswordToken(false);
    // setIsOpenModal(false);
  }, [searchParams, openModal]);

  const { query, onChangeInput, onHandleSearch } = useAdditionalRequest();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { filteredNews, resetAllFilters } = useFiltersAction();

  const location = useLocation();
  const { isHomeActive, isAccountPage, isManageAccountPage } = useActiveLinks(location);

  const { headerClass, textClass, burgerMenuButtonClass, accountIconStyles } =
    useHeaderStyles(isHomeActive);

  const handleVisibilityChange = () => {
    setTouched(!touched);
  };

  const resetFilters = () => {
    if (filteredNews && filteredNews.length > 0) {
      resetAllFilters();
    }
  };

  const isNotMobile = breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop;
  const isAccountPages = isAccountPage || isManageAccountPage;

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 min-h-[81px] md:min-h-[106px] lg:min-h-[113px] flex items-center justify-center ${
          isHomeActive
            ? headerClass
            : 'bg-whiteBase/[.8] dark:bg-darkBackground/[.8] border-b border-solid border-fullDark/[.2] dark:border-whiteBase/[.2]'
        } transition-all duration-100 ${isOpenMenu && 'border-b-0'} ${
          isOpenModal ? 'z-0 pointer-events-none' : 'z-50 pointer-events-auto'
        }`}
      >
        <div
          className={`container relative mx-auto px-4 hg:px-[65px] flex justify-between items-center ${
            isAuthenticated ? 'gap-3.5' : ''
          }`}
        >
          {isNotMobile && !isAccountPages && isAuthenticated ? (
            <Link
              to='/account'
              className={`absolute top-1.5 right-40 lg:right-60 hg:text-xl flex items-center gap-3  ${
                isHomeActive ? textClass : 'text-darkBase dark:text-whiteBase'
              } group hover:text-accentBase hover:underline hover:decoration-accentBase transition-colors duration-500`}
            >
              {user.name}
              <SvgIcon
                svgName='icon-account'
                size={18}
                className={`${
                  isHomeActive
                    ? accountIconStyles
                    : 'fill-darkBase dark:fill-whiteBase group-hover:fill-accentBase dark:group-hover:fill-whiteBase'
                }`}
              />
            </Link>
          ) : null}
          <Link
            to='/'
            className={`sm:py-6 md:pt-8 md:pb-[30px] lg:py-7 text-3xl leading-tight lg:leading-[1.357144] md:text-4xl lg:text-giant font-bold transition-colors duration-500 ${
              !isOpenMenu && isHomeActive ? textClass : 'text-darkBase dark:text-whiteBase'
            } 
              `}
          >
            News
          </Link>
          {isNotMobile && isAuthenticated ? <MainMenu /> : null}

          {isAuthenticated ? (
            <>
              <div className='flex items-center gap-3.5 lg:gap-12'>
                {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
                  <>
                    {!isOpenMenu && isHomeActive ? (
                      <search>
                        <form
                          onSubmit={(e) => onHandleSearch(e)}
                          className='max-md:overflow-hidden'
                        >
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
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                              onChangeInput(event)
                            }
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
                      className='w-6 h-6 md:hidden'
                      onClick={() => {
                        toggleMenu();
                        resetFilters();
                      }}
                    >
                      <SvgIcon
                        svgName={`${isOpenMenu ? 'icon-close' : 'icon-burger-menu'}`}
                        size={24}
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
          ) : (
            <div className={`${isNotMobile ? 'flex flex-col gap-3' : ''}`}>
              <AuthButton />
              {isNotMobile ? <ThemeSwitcher variant={VariantSwitcher.Header} /> : null}
            </div>
          )}
        </div>
      </header>
      {isOpenModal && (
        <Modal closeModal={toggleModal} modalRef={popUpRef} variant={VariantModals.Auth}>
          <AuthModal passwordToken={passwordToken} />
        </Modal>
      )}
      {isOpenMenu && <MainMenu isOpen={isOpenMenu} closeMenu={toggleMenu} />}
      {isOpenMenu && isAccountPages && <AccountMenu isOpen={isOpenMenu} closeMenu={toggleMenu} />}
    </>
  );
};

export default Header;
