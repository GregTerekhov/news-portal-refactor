import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthCollector, usePopUp, useWindowWidth } from 'hooks';

import { Modal, PrimaryButton } from 'ui';
import { ClickHandler } from 'ui/PrimaryButton';

import AuthModal from './AuthModal';

const Auth = () => {
  const { isOpenModal, popUpRef, toggleModal } = usePopUp();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { isLoggedIn, logout } = useAuthCollector();
  const navigate = useNavigate();

  const onSignOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <div className='flex items-center justify-center'>
        <PrimaryButton
          id={breakpointsForMarkup?.isDesktop ? 'Auth button for signin and signout' : ''}
          ariaLabel={!breakpointsForMarkup?.isDesktop ? 'Auth button for signin and signout' : ''}
          variant={`${breakpointsForMarkup?.isDesktop ? 'Primary' : 'Small'}`}
          onHandleClick={!isLoggedIn ? (toggleModal as ClickHandler) : (onSignOut as ClickHandler)}
          hasIcon={true}
          svgName={`${isLoggedIn ? 'icon-signout' : 'icon-auth'}`}
          svgSize={breakpointsForMarkup?.isDesktop ? 28 : 24}
          classNameIcon='fill-whiteBase'
          classNameButton={`${
            breakpointsForMarkup?.isDesktop
              ? ''
              : 'border-transparent dark:border-whiteBase bg-accentBase hover:bg-accentAlt transition-colors duration-500 p-1.5'
          }`}
        >
          {breakpointsForMarkup?.isDesktop ? (isLoggedIn ? 'Sign Out' : 'Auth') : null}
        </PrimaryButton>
      </div>
      {isOpenModal && (
        <Modal closeModal={toggleModal} modalRef={popUpRef} variant='auth'>
          <AuthModal />
        </Modal>
      )}
    </>
  );
};

export default Auth;
