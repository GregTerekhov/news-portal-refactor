import React, { FC } from 'react';

import { VariantButton } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';
import { useModalStateContext, useWindowWidthContext } from 'contexts';

import { useActiveLinks, useCrypto, useHeaderStyles, usePopUp, useSignOut } from 'hooks';
import { localStorageOperation } from 'helpers';

import { AuthModal } from 'components';
import { Modal, PrimaryButton } from 'ui';

import { getButtonStyles, renderButtonText } from '../assistants';

interface AuthButtonProps {
  passwordToken?: boolean;
}

const Auth: FC<AuthButtonProps> = ({ passwordToken }) => {
  const { isAuthenticated } = useAuthRedux();
  const { wideScreens } = useWindowWidthContext();
  const { isOpenModal } = useModalStateContext();

  const { popUpRef, toggleModal } = usePopUp();
  const { isHomeActive } = useActiveLinks();
  const { authButtonClass } = useHeaderStyles(isHomeActive);
  const { fetchCryptoPassword } = useCrypto();
  const { handleSignOut } = useSignOut();

  const isCredentialsRemembered = localStorageOperation('get', 'rememberMe');

  //Функція відкриття модалки при наявності збереженого Remember me та запиту шифрованого пароля
  const onOpenModal = () => {
    if (isCredentialsRemembered) fetchCryptoPassword();
    toggleModal();
  };

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
          classNameButton={getButtonStyles(isHomeActive, authButtonClass, wideScreens)}
        >
          {renderButtonText(wideScreens, isAuthenticated)}
        </PrimaryButton>
      </div>
      {isOpenModal && !isAuthenticated && (
        <Modal closeModal={toggleModal} modalRef={popUpRef}>
          <AuthModal passwordToken={passwordToken} />
        </Modal>
      )}
    </>
  );
};

export default Auth;
