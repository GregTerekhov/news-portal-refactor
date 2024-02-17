import React, { FC, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { useAuthRedux, useFiltersAction } from 'reduxStore/hooks';

import { VariantModals, VariantSwitcher } from 'types';

import { useWindowWidth } from 'contexts';
import { useActiveLinks, useHeaderStyles, usePopUp } from 'hooks';

import { AuthModal } from 'components';
import { Modal, ThemeSwitcher } from 'ui';

import { AuthButton, MainMenu, UserAccountLink } from './subcomponents';
import { AuthenticatedHeaderContent } from './subcomponents';

const Header: FC<{}> = () => {
  const [touched, setTouched] = useState<boolean>(false);
  const [passwordToken, setPasswordToken] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const token: string | null = searchParams.get('token');
  const openModal: string | null = searchParams.get('openModal');

  const { isOpenMenu, isOpenModal, setIsOpenModal, toggleModal, popUpRef } = usePopUp();
  const { isAuthenticated, user, writeTokens } = useAuthRedux();

  useEffect(() => {
    if (!user && token && openModal) {
      setPasswordToken(true);
      writeTokens({ accessToken: token, refreshToken: null });
      setIsOpenModal(true);
    }
    // setPasswordToken(false);
    // setIsOpenModal(false);
  }, [searchParams, openModal]);

  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { filteredNews, resetAllFilters } = useFiltersAction();

  const { isHomeActive, isAccountPage, isManageAccountPage } = useActiveLinks();

  const { headerClass, textClass } = useHeaderStyles(isHomeActive);

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
        className={`fixed left-0 top-0 flex min-h-81px w-full items-center justify-center md:min-h-106px lg:min-h-113px ${
          isHomeActive
            ? headerClass
            : 'border-b border-solid border-fullDark/[.2] bg-whiteBase/[.8] dark:border-whiteBase/[.2] dark:bg-darkBackground/[.8]'
        } transition-all duration-100 ${isOpenMenu && 'border-b-0'} ${
          isOpenModal ? 'pointer-events-none z-0' : 'pointer-events-auto z-50'
        }`}
      >
        <div
          className={`container relative mx-auto flex items-center justify-between px-4 hg:px-[65px] ${
            isAuthenticated ? 'gap-3.5' : ''
          }`}
        >
          {isNotMobile && !isAccountPages && isAuthenticated ? (
            <UserAccountLink isHomeActive={isHomeActive} />
          ) : null}
          <Link
            to='/'
            className={`text-3xl font-bold leading-tight transition-colors duration-500 sm:py-6 md:pb-[30px] md:pt-8 md:text-4xl lg:py-7 lg:text-giant lg:leading-[1.357144] ${
              !isOpenMenu && isHomeActive ? textClass : 'z-50 text-darkBase dark:text-whiteBase'
            } 
              `}
          >
            News
          </Link>
          {isNotMobile && isAuthenticated ? <MainMenu /> : null}

          {isAuthenticated ? (
            <AuthenticatedHeaderContent
              handleVisibilityChange={handleVisibilityChange}
              touched={touched}
              resetFilters={resetFilters}
            />
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
    </>
  );
};

export default Header;
