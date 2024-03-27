import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotification, useWindowWidth } from 'contexts';

import { ClickHandler, VariantButton } from 'types';
import { useActiveLinks, useCrypto, useHeaderStyles, usePopUp } from 'hooks';

import { AuthModal } from 'components';
import { Modal, PrimaryButton } from 'ui';

interface AuthButtonProps {
  passwordToken?: boolean;
}

const Auth: FC<AuthButtonProps> = ({ passwordToken }) => {
  const { logout, isAuthenticated } = useAuthRedux();
  const { wideScreens } = useWindowWidth();
  const { showToast } = useNotification();

  const { isOpenModal, popUpRef, toggleModal } = usePopUp();
  const { isHomeActive } = useActiveLinks();
  const { authButtonClass } = useHeaderStyles(isHomeActive);
  const { fetchCryptoPassword } = useCrypto();

  const navigate = useNavigate();

  const onOpenModal = () => {
    fetchCryptoPassword();

    toggleModal();
  };

  const onSignOut = async (): Promise<void> => {
    const response = await logout();

    showToast(response.meta.requestStatus);
    localStorage.removeItem('_persist');
    navigate('/');
  };

  return (
    <>
      <div className='max-lg:flex max-lg:items-center max-lg:justify-center'>
        <PrimaryButton
          id={wideScreens ? 'Auth button for signin and signout' : ''}
          ariaLabel={!wideScreens ? 'Auth button for signin and signout' : ''}
          variant={wideScreens ? VariantButton.Primary : VariantButton.Small}
          onHandleClick={!isAuthenticated ? onOpenModal : (onSignOut as ClickHandler)}
          hasIcon={true}
          svgName={`${isAuthenticated ? 'signout' : 'auth'}`}
          svgSize={wideScreens ? 'mdIcon28' : 'mdIcon24'}
          classNameIcon='fill-whiteBase'
          classNameButton={`${
            isHomeActive && authButtonClass
          } border border-solid border-transparent dark:border-whiteBase bg-accentBase hocus:bg-accentAlt ${
            wideScreens ? '' : 'border-transparent p-1.5'
          }`}
        >
          {wideScreens ? (isAuthenticated ? 'Sign Out' : 'Auth') : null}
        </PrimaryButton>
      </div>
      {isOpenModal && (
        <Modal closeModal={toggleModal} modalRef={popUpRef}>
          <AuthModal isOpenModal={isOpenModal} passwordToken={passwordToken} />
        </Modal>
      )}
    </>
  );
};

export default Auth;
