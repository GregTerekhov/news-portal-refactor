import React, { FC, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { useAuthRedux, useFiltersAction } from 'reduxStore/hooks';

import { VariantSwitcher } from 'types';

import { useScrollBodyContext, useWindowWidth } from 'contexts';
import { useActiveLinks, useHeaderStyles, usePopUp } from 'hooks';

import { AuthModal } from 'components';
import { Modal, ThemeSwitcher } from 'ui';

import { AuthButton, AuthenticatedHeaderContent, UserAccountLink } from './subcomponents';
import CommonMenu from '../CommonMenu/CommonMenu';

const Header: FC<{}> = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);
  const [passwordToken, setPasswordToken] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const token: string | null = searchParams.get('token');
  const openModal: string | null = searchParams.get('openModal');

  const { isOpenModal, setIsOpenModal, toggleModal, popUpRef } = usePopUp();
  const { isAuthenticated, user, writeTokens } = useAuthRedux();
  const { isScrollDisabled, setIsScrollDisabled } = useScrollBodyContext();

  useEffect(() => {
    if (!user.id && token && openModal) {
      setPasswordToken(true);
      writeTokens({ accessToken: token, refreshToken: null });
      setIsOpenModal(true);
    }
  }, [token, openModal, user]);

  const { isNotMobile } = useWindowWidth();
  const { filteredNews, resetAllFilters } = useFiltersAction();
  const { isHomeActive, isAccountPage, isManageAccountPage } = useActiveLinks();
  const { headerClass, textClass } = useHeaderStyles(isHomeActive);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    setIsScrollDisabled(!isScrollDisabled);
  };

  const handleVisibilityChange = () => {
    setTouched(!touched);
  };

  const resetFilters = () => {
    if (filteredNews && filteredNews.length > 0) {
      resetAllFilters();
    }
  };
  const isAccountPages = isAccountPage || isManageAccountPage;

  return (
    <>
      <header
        className={`fixed left-0 top-0 flex min-h-81px w-full items-center justify-center md:min-h-106px lg:min-h-113px hg:min-h-136px ${
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
            className={`z-50 text-3xl font-bold leading-tight transition-colors duration-500 sm:py-6 md:pb-[30px] md:pt-8 md:text-4xl lg:py-7 lg:text-giant lg:leading-[1.357144] ${
              isHomeActive && !isOpenMenu ? textClass : 'text-darkBase dark:text-whiteBase'
            } 
              `}
          >
            News
          </Link>
          {isNotMobile && isAuthenticated ? <CommonMenu navId='main-navigation' /> : null}

          {isAuthenticated ? (
            <AuthenticatedHeaderContent
              handleVisibilityChange={handleVisibilityChange}
              touched={touched}
              resetFilters={resetFilters}
              isOpenMenu={isOpenMenu}
              toggleMenu={toggleMenu}
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
        <Modal closeModal={toggleModal} modalRef={popUpRef}>
          <AuthModal passwordToken={passwordToken} />
        </Modal>
      )}
    </>
  );
};

export default Header;
