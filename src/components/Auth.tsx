import React from 'react';
import { Modal, PrimaryButton } from 'ui';
import { PB } from 'ui/PrimaryButton';
import AuthModal from './AuthModal';
import { S } from 'ui/Modal';
import { usePopUp } from 'hooks';

const Auth = () => {
  const { isOpenModal, popUpRef, toggleModal } = usePopUp();

  return (
    <>
      <PrimaryButton buttonData={{ type: 'button' }} variant={PB.Other} onHandleClick={toggleModal}>
        Signin/Signup
      </PrimaryButton>
      {isOpenModal && (
        <Modal closeModal={toggleModal} modalRef={popUpRef} variant={S.Auth}>
          <AuthModal />
        </Modal>
      )}
    </>
  );
};

export default Auth;
