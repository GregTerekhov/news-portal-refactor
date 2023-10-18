import React from 'react';
import { Modal, PrimaryButton } from 'ui';
import { usePopUp } from 'hooks';
import AuthModal from './AuthModal';

const Auth = () => {
  const { isOpenModal, popUpRef, toggleModal } = usePopUp();

  return (
    <>
      <PrimaryButton
        buttonData={{ type: 'button' }}
        variant='OtherButton'
        onHandleClick={toggleModal}
      >
        Signin/Signup
      </PrimaryButton>
      {isOpenModal && (
        <Modal closeModal={toggleModal} modalRef={popUpRef} variant='auth'>
          <AuthModal />
        </Modal>
      )}
    </>
  );
};

export default Auth;
