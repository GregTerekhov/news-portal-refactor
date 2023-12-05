import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { setTokens } from 'reduxStore/auth';

import {
  useActiveLinks,
  useAdditionalRequest,
  useAuthCollector,
  useFilterCollector,
  useHeaderStyles,
  usePopUp,
  useWindowWidth,
} from 'hooks';

import { ThemeSwitcher, AuthModal, AccountMenu } from 'components';
import { Modal, SvgIcon, UnverifiableInput } from 'ui';

import { AuthButton, Menu } from './subcomponents';

const Header: FC = () => {
  const { query, onChangeInput, onHandleSearch } = useAdditionalRequest();
  const { isOpenMenu, isOpenModal, setIsOpenModal, toggleMenu, toggleModal, popUpRef } = usePopUp();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { user } = useAuthCollector();
  const { resetAllFilters } = useFilterCollector();
  const [touched, setTouched] = useState<boolean>(false);
  const [passwordToken, setPasswordToken] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const isAuthenticated = true;
  const { headerClass, textClass, burgerMenuButtonClass, accountIconStyles } = useHeaderStyles(
    activeLinks.isHomeActive,
  );
  const { filteredNews } = useFilterCollector();
  const token = searchParams.get('passwordToken');
  const openModal = searchParams.get('openModal');

  useEffect(() => {
    if (!user && token && openModal) {
      setPasswordToken(true);
      setTokens({ accessToken: token, refreshToken: null });
      setIsOpenModal(true);
    }
    setPasswordToken(false);
    setIsOpenModal(false);
  }, [searchParams]);

  const isNotMobile = breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop;

  const handleVisibilityChange = () => {
    setTouched(!touched);
  };

  const resetFilters = () => {
    if (filteredNews && filteredNews.length > 0) {
      resetAllFilters();
    }
  };

  const isAccountPages = activeLinks.isAccountPage || activeLinks.isManageAccountPage;

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 min-h-[81px] md:min-h-[106px] lg:min-h-[113px] flex items-center justify-center ${
          activeLinks.isHomeActive
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
                activeLinks.isHomeActive ? textClass : 'text-darkBase dark:text-whiteBase'
              } group hover:text-accentBase hover:underline hover:decoration-accentBase transition-colors duration-500`}
            >
              {user.name}
              <SvgIcon
                svgName='icon-account'
                size={18}
                className={`${
                  activeLinks.isHomeActive
                    ? accountIconStyles
                    : 'fill-darkBase dark:fill-whiteBase group-hover:fill-accentBase dark:group-hover:fill-whiteBase'
                }`}
              />
            </Link>
          ) : null}
          <Link
            to='/'
            className={`sm:py-6 md:pt-8 md:pb-[30px] lg:py-7 text-3xl leading-tight lg:leading-[1.357144] md:text-4xl lg:text-giant font-bold transition-colors duration-500 ${
              !isOpenMenu && activeLinks.isHomeActive
                ? textClass
                : 'text-darkBase dark:text-whiteBase'
            } 
              `}
          >
            News
          </Link>
          {isNotMobile && isAuthenticated ? <Menu /> : null}

          {isAuthenticated ? (
            <>
              <div className='flex items-center gap-3.5 lg:gap-12'>
                {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
                  <>
                    {!isOpenMenu && activeLinks.isHomeActive ? (
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
                            variant='header'
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
                          !isOpenMenu && activeLinks.isHomeActive
                            ? burgerMenuButtonClass
                            : 'stroke-darkBase dark:stroke-whiteBase'
                        }`}
                      />
                    </button>
                  </>
                ) : (
                  <div className='flex flex-col gap-3'>
                    {!isAccountPages && <AuthButton />}
                    <ThemeSwitcher variant='header' />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={`${isNotMobile ? 'flex flex-col gap-3' : ''}`}>
              <AuthButton />
              {isNotMobile ? <ThemeSwitcher variant='header' /> : null}
            </div>
          )}
        </div>
      </header>
      {isOpenModal && (
        <Modal closeModal={toggleModal} modalRef={popUpRef} variant='auth'>
          <AuthModal passwordToken={passwordToken} />
        </Modal>
      )}
      {isOpenMenu && <Menu isOpen={isOpenMenu} closeMenu={toggleMenu} />}
      {isOpenMenu && isAccountPages && <AccountMenu isOpen={isOpenMenu} closeMenu={toggleMenu} />}
    </>
  );
};

export default Header;
