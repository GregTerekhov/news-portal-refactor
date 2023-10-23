import React from 'react';
import { Input, Modal, SvgIcon } from 'ui';
import { Menu, ThemeSwitcher, Auth, AuthModal } from 'components';
import { useHeaderStyles, usePopUp, useWindowWidth } from 'hooks';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { isOpenMenu, isOpenModal, toggleMenu, toggleModal, popUpRef } = usePopUp();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const { headerClass, textClass } = useHeaderStyles(isHomePage);

  const isLoggedIn = true;

  const isNotMobile = breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop;

  return (
    <>
      <div
        className={`fixed w-full top-0 left-0 min-h-[81px] md:min-h-[106px] lg:min-h-[113px] ${
          isHomePage
            ? headerClass
            : 'bg-foregroundLight dark:bg-foregroundDark border-b border-solid border-line dark:border-darkThemeLine'
        } transition-colors duration-500 ${isOpenMenu && 'border-b-0'} ${
          isOpenModal ? 'z-0 pointer-events-none' : 'z-50 pointer-events-auto'
        }`}
      >
        <div className='container mx-auto px-4 hg:px-[65px] flex justify-between items-center gap-3.5'>
          <a
            href='/'
            className={`sm:py-6 md:pt-8 md:pb-[30px] lg:py-7 text-3xl leading-tight lg:leading-[1.357144] md:text-4xl lg:text-giant font-bold ${
              isHomePage ? textClass : 'text-darkBase dark:text-whiteBase'
            } 
              `}
          >
            News
          </a>
          {isNotMobile && isLoggedIn ? <Menu /> : null}

          {isOpenMenu ? null : (
            <form action='#'>
              <Input
                inputData={{ name: 'query', type: 'text', placeholder: 'Search |' }}
                hasIcon={true}
                variant='header'
              />
            </form>
          )}
          <button
            type='button'
            className='w-6 h-6 md:hidden'
            onClick={isLoggedIn ? toggleMenu : toggleModal}
          >
            {isLoggedIn ? (
              <SvgIcon
                svgName={`${isOpenMenu ? 'icon-close' : 'icon-burger-menu'}`}
                size={24}
                className={`stroke-darkBase dark:stroke-whiteBase ${
                  !isOpenMenu && isHomePage && 'stroke-whiteBase'
                }`}
              />
            ) : (
              <SvgIcon
                svgName='icon-auth'
                size={24}
                className={`${isHomePage ? 'fill-whiteBase' : 'fill-darkBase dark:fill-whiteBase'}`}
              />
            )}
          </button>

          {isNotMobile ? (
            <div className={`${!isLoggedIn && 'flex flex-col gap-3'}`}>
              {!isLoggedIn && <Auth />}
              <ThemeSwitcher variant='header' />
            </div>
          ) : null}
        </div>
      </div>
      {isOpenModal && (
        <Modal closeModal={toggleModal} modalRef={popUpRef} variant='auth'>
          <AuthModal />
        </Modal>
      )}
      {isOpenMenu && <Menu isOpen={isOpenMenu} closeMenu={toggleMenu} />}
    </>
  );
};

export default Header;
