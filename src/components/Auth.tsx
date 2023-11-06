import React from 'react';
import { Modal, PrimaryButton, SvgIcon } from 'ui';
import { usePopUp, useWindowWidth } from 'hooks';
import AuthModal from './AuthModal';
import { ClickHandler } from 'ui/PrimaryButton';

const Auth = () => {
  const { isOpenModal, popUpRef, toggleModal } = usePopUp();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const isLoggedIn = true;

  return (
    <div className='flex items-center justify-center'>
      {breakpointsForMarkup?.isDesktop ? (
        <PrimaryButton
          buttonData={{ type: 'button' }}
          variant='SearchBlock'
          onHandleClick={!isLoggedIn ? (toggleModal as ClickHandler) : undefined}
          hasIcon={true}
          svgName={`${isLoggedIn ? 'icon-signout' : 'icon-auth'}`}
          svgSize={28}
          className='fill-whiteBase'
        >
          {isLoggedIn ? 'Sign Out' : 'Auth'}
        </PrimaryButton>
      ) : (
        <button
          type='button'
          onClick={!isLoggedIn ? (toggleModal as ClickHandler) : undefined}
          className='flex items-center p-1.5 border border-solid border-whiteBase rounded-[10px] bg-accentBase hover:bg-accentAlt transition-colors'
        >
          <SvgIcon
            svgName={isLoggedIn ? 'icon-signout' : 'icon-auth'}
            size={24}
            className='fill-whiteBase'
          />
        </button>
      )}
      {isOpenModal && (
        <Modal closeModal={toggleModal} modalRef={popUpRef} variant='auth'>
          <AuthModal />
        </Modal>
      )}
    </div>
  );
};

export default Auth;
