import React from 'react';
import { Modal, PrimaryButton } from 'ui';
import { usePopUp } from 'hooks';
import AuthModal from './AuthModal';
import { ClickHandler } from 'ui/PrimaryButton';

const Auth = () => {
  const { isOpenModal, popUpRef, toggleModal } = usePopUp();
  const isLoggedIn = true;

  return (
    <div className='mb-3 pl-2'>
      <PrimaryButton
        buttonData={{ type: 'button' }}
        variant='OtherButton'
        onHandleClick={!isLoggedIn ? (toggleModal as ClickHandler) : undefined}
        hasIcon={true}
        svgName={`${isLoggedIn && 'icon-signout'}`}
        svgSize={isLoggedIn && 24}
        className='stroke-whiteBase fill-transparent'
      >
        {isLoggedIn ? 'Sign Out' : 'Signin/Signup'}
      </PrimaryButton>
      {isOpenModal && (
        <Modal closeModal={toggleModal} modalRef={popUpRef} variant='auth'>
          <AuthModal />
        </Modal>
      )}
    </div>
  );
};

export default Auth;
