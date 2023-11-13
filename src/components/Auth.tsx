import React from 'react';
import { Modal, PrimaryButton } from 'ui';
import { usePopUp, useWindowWidth } from 'hooks';
import AuthModal from './AuthModal';
import { ClickHandler } from 'ui/PrimaryButton';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth';
import { useAppDispatch } from 'redux/hooks';
import { signOut } from 'redux/auth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const { isOpenModal, popUpRef, toggleModal } = usePopUp();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSignOut = async () => {
    await dispatch(signOut());
    navigate('/');
  };

  return (
    <div className='flex items-center justify-center'>
      <PrimaryButton
        id={breakpointsForMarkup?.isDesktop ? 'Auth button for sign in and sign out' : ''}
        ariaLabel={!breakpointsForMarkup?.isDesktop ? 'Auth button for sign in and sign out' : ''}
        variant={`${breakpointsForMarkup?.isDesktop ? 'Primary' : 'Small'}`}
        onHandleClick={!isLoggedIn ? (toggleModal as ClickHandler) : onSignOut}
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

      {isOpenModal && (
        <Modal closeModal={toggleModal} modalRef={popUpRef} variant='auth'>
          <AuthModal />
        </Modal>
      )}
    </div>
  );
};

export default Auth;
