import React, { FC } from 'react';

import { VariantButton } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';
import { useWindowWidthContext } from 'contexts';

import { useActiveLinks, useCrypto, useHeaderStyles, usePopUp, useSignOut } from 'hooks';

import { AuthModal } from 'components';
import { Modal, PrimaryButton } from 'ui';

interface AuthButtonProps {
  passwordToken?: boolean;
}

const Auth: FC<AuthButtonProps> = ({ passwordToken }) => {
  const { isAuthenticated } = useAuthRedux();
  const { wideScreens } = useWindowWidthContext();

  const { isOpenModal, popUpRef, toggleModal } = usePopUp();
  const { isHomeActive } = useActiveLinks();
  const { authButtonClass } = useHeaderStyles(isHomeActive);
  const { fetchCryptoPassword } = useCrypto();
  const { handleSignOut } = useSignOut();

  const isCredentialsRemembered = localStorage.getItem('rememberMe');

  //Функція відкриття модалки при наявності збереженого Remember me та запиту шифрованого пароля
  const onOpenModal = () => {
    if (isCredentialsRemembered) fetchCryptoPassword();
    toggleModal();
  };

  const renderButtonText = () => {
    return wideScreens ? (isAuthenticated ? 'Sign Out' : 'Auth') : null;
  };

  const buttonStyles = `${isHomeActive && authButtonClass} ${
    wideScreens ? '' : 'border-transparent p-1.5'
  } border border-solid border-transparent dark:border-whiteBase bg-accentBase hocus:bg-accentAlt`;

  return (
    <>
      <div className='max-lg:flex max-lg:items-center max-lg:justify-center'>
        <PrimaryButton
          id={wideScreens ? 'Auth button for signin and signout' : ''}
          ariaLabel={!wideScreens ? 'Auth button for signin and signout' : ''}
          variant={wideScreens ? VariantButton.Primary : VariantButton.Small}
          onHandleClick={!isAuthenticated ? onOpenModal : handleSignOut}
          hasIcon={true}
          svgName={`${isAuthenticated ? 'signout' : 'auth'}`}
          svgSize={wideScreens ? 'mdIcon28' : 'mdIcon24'}
          classNameIcon='fill-whiteBase'
          classNameButton={buttonStyles}
        >
          {renderButtonText()}
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
