import React from 'react';
import { Input, Modal, SvgIcon } from 'ui';
import { Menu, ThemeSwitcher, Auth, AuthModal } from 'components';
import { usePopUp, useWindowWidth } from 'hooks';

const Header = () => {
  const { isOpenMenu, isOpenModal, toggleMenu, toggleModal, popUpRef } = usePopUp();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const isLoggedIn = true;

  const isNotMobile = breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop;

  return (
    <>
      <div
        className={`fixed w-full z-20 top-0 left-0 min-h-[81px] md:min-h-[106px] lg:min-h-[113px] border-solid border-line bg-foregroundLight ${
          isOpenMenu ? 'border-b-0' : 'border-b-[1px] '
        } ${isOpenModal ? 'z-0 pointer-events-none' : 'z-10 pointer-events-auto'}`}
      >
        <div className='container mx-auto px-4 hg:px-[65px] flex justify-between items-center gap-3.5'>
          <a
            href='/'
            className='sm:py-6 md:pt-8 md:pb-[30px] lg:py-7 text-3xl leading-tight lg:leading-[1.357144] md:text-4xl lg:text-giant font-bold text-darkBase'
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
                className='stroke-darkBase'
              />
            ) : (
              <SvgIcon svgName='icon-auth' size={24} className='stroke-darkBase' />
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
      {isOpenMenu && <Menu isOpen={isOpenMenu} />}
    </>
  );
};

export default Header;
