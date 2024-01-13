import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthRedux } from 'reduxStore/hooks';

import { ClickHandler, VariantButton, VariantModals } from 'types';
import { useWindowWidth } from 'contexts';
import { useActiveLinks, useHeaderStyles, usePopUp } from 'hooks';

import { AuthModal } from 'components';
import { Modal, PrimaryButton } from 'ui';

const Auth: FC<{}> = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { logout, isAuthenticated } = useAuthRedux();
  const { isOpenModal, popUpRef, toggleModal } = usePopUp();
  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { authButtonClass } = useHeaderStyles(activeLinks.isHomeActive);

  const navigate = useNavigate();

  const onSignOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <div className='max-lg:flex max-lg:items-center max-lg:justify-center'>
        <PrimaryButton
          id={breakpointsForMarkup?.isDesktop ? 'Auth button for signin and signout' : ''}
          ariaLabel={!breakpointsForMarkup?.isDesktop ? 'Auth button for signin and signout' : ''}
          variant={breakpointsForMarkup?.isDesktop ? VariantButton.Primary : VariantButton.Small}
          onHandleClick={
            !isAuthenticated ? (toggleModal as ClickHandler) : (onSignOut as ClickHandler)
          }
          hasIcon={true}
          svgName={`${isAuthenticated ? 'icon-signout' : 'icon-auth'}`}
          svgSize={breakpointsForMarkup?.isDesktop ? 28 : 24}
          classNameIcon='fill-whiteBase'
          classNameButton={`${
            activeLinks.isHomeActive && authButtonClass
          } border border-solid border-transparent dark:border-whiteBase bg-accentBase hover:bg-accentAlt transition-colors duration-500 ${
            breakpointsForMarkup?.isDesktop ? '' : 'border-transparent p-1.5'
          }`}
        >
          {breakpointsForMarkup?.isDesktop ? (isAuthenticated ? 'Sign Out' : 'Auth') : null}
        </PrimaryButton>
      </div>
      {isOpenModal && (
        <Modal closeModal={toggleModal} modalRef={popUpRef} variant={VariantModals.Auth}>
          <AuthModal />
        </Modal>
      )}
    </>
  );
};

export default Auth;
