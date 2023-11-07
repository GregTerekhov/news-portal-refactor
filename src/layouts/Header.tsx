import React, { useState } from 'react';
import { Input, Modal, SvgIcon } from 'ui';
import { Menu, ThemeSwitcher, Auth, AuthModal } from 'components';
import { useActiveLinks, useHeaderStyles, usePopUp, useWindowWidth } from 'hooks';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { fetchNewsByKeyword } from 'redux/newsAPI';
import { resetOtherRequests } from 'redux/newsAPI/newsAPISlice';

const Header = () => {
  const { isOpenMenu, isOpenModal, toggleMenu, toggleModal, popUpRef } = usePopUp();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const [touched, setTouched] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const dispatch = useAppDispatch();
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { headerClass, textClass, burgerMenuButtonClass } = useHeaderStyles(
    activeLinks.isHomeActive,
  );
  const isLoggedIn = true;
  const isNotMobile = breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop;

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value.toLowerCase());
  };

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query) {
      dispatch(resetOtherRequests());
      dispatch(fetchNewsByKeyword(query));
      setQuery('');
    }
  };

  const handleVisibilityChange = () => {
    if (breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile) {
      setTouched(!touched);
    }
  };

  return (
    <>
      <div
        className={`fixed w-full top-0 left-0 min-h-[81px] md:min-h-[106px] lg:min-h-[113px] ${
          activeLinks.isHomeActive
            ? headerClass
            : 'bg-whiteBase/[.8] dark:bg-darkBackground/[.8] border-b border-solid border-fullDark/[.2] dark:border-whiteBase/[.2]'
        } transition-colors duration-500 ${isOpenMenu && 'border-b-0'} ${
          isOpenModal ? 'z-0 pointer-events-none' : 'z-50 pointer-events-auto'
        }`}
      >
        <div className='container mx-auto px-4 hg:px-[65px] flex justify-between items-center gap-3.5'>
          <a
            href='/'
            className={`sm:py-6 md:pt-8 md:pb-[30px] lg:py-7 text-3xl leading-tight lg:leading-[1.357144] md:text-4xl lg:text-giant font-bold transition-colors duration-500 ${
              !isOpenMenu && activeLinks.isHomeActive
                ? textClass
                : 'text-darkBase dark:text-whiteBase'
            } 
              `}
          >
            News
          </a>
          {isNotMobile && isLoggedIn ? <Menu /> : null}

          {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
            <div className={`flex items-center gap-3.5`}>
              {isOpenMenu ? null : (
                <form onSubmit={onHandleSubmit} className='max-md:overflow-hidden'>
                  <Input
                    inputData={{
                      name: 'query',
                      type: 'text',
                      value: query,
                      placeholder: 'Search |',
                    }}
                    hasIcon={true}
                    variant='header'
                    hideInput={handleVisibilityChange}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeInput(event)}
                    touched={touched}
                  />
                </form>
              )}
              <button
                type='button'
                className='w-6 h-6 md:hidden'
                onClick={isLoggedIn ? toggleMenu : toggleModal}
              >
                <SvgIcon
                  svgName={`${
                    isLoggedIn ? (isOpenMenu ? 'icon-close' : 'icon-burger-menu') : 'icon-auth'
                  }`}
                  size={24}
                  className={`${
                    isLoggedIn
                      ? !isOpenMenu && activeLinks.isHomeActive
                        ? burgerMenuButtonClass
                        : 'stroke-darkBase dark:stroke-whiteBase'
                      : activeLinks.isHomeActive
                      ? 'fill-whiteBase'
                      : 'fill-darkBase dark:fill-whiteBase'
                  }`}
                />
              </button>
            </div>
          ) : (
            <>
              <form
                action='#'
                onSubmit={(e) => onHandleSubmit(e)}
                className='max-md:overflow-hidden'
              >
                <Input
                  inputData={{ name: 'query', type: 'text', value: query, placeholder: 'Search |' }}
                  hasIcon={true}
                  variant='header'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeInput(event)}
                  touched={touched}
                />
              </form>
              <div className='flex flex-col gap-3'>
                <Auth />
                <ThemeSwitcher variant='header' />
              </div>
            </>
          )}
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
