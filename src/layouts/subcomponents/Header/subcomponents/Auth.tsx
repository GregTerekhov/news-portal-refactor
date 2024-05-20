import React, { FC } from 'react';

import { IconName, IconSizes, ButtonType, VariantButton, PrimaryButtonId } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';
import { useModalStateContext, useWindowWidthContext } from 'contexts';

import { AuthModal } from 'components';
import { Modal, PrimaryButton } from 'ui';

import { useActiveLinks, useCrypto, useHeaderStyles, usePopUp, useSignOut } from 'hooks';
import { localStorageOperation, OperationType } from 'helpers';
import { getButtonStyles, renderButtonText } from '../assistants';

interface IAuthButtonProps {
  passwordToken?: boolean;
}

const Auth: FC<IAuthButtonProps> = ({ passwordToken }) => {
  const { isAuthenticated } = useAuthRedux();

  const { isWideScreens } = useWindowWidthContext();
  const { isOpenModal } = useModalStateContext();

  const { popUpRef, toggleModal } = usePopUp();
  const { isHomeActive } = useActiveLinks();
  const { authButtonClass } = useHeaderStyles(isHomeActive);
  const { retrieveDecryptedData } = useCrypto();
  const { handleSignOut } = useSignOut();

  const isCredentialsRemembered = localStorageOperation(OperationType.Get, 'rememberMe');

  //Функція відкриття модалки при наявності збереженого Remember me та запиту шифрованого пароля
  const onOpenModal = () => {
    if (isCredentialsRemembered) retrieveDecryptedData();
    toggleModal();
  };

  const buttonStyles = getButtonStyles(isHomeActive, authButtonClass, isWideScreens);
  const buttonText = renderButtonText(isWideScreens, isAuthenticated);

  return (
    <>
      <div className='max-lg:flex max-lg:items-center max-lg:justify-center'>
        <PrimaryButton
          id={isWideScreens ? PrimaryButtonId.AuthButton : undefined}
          type={!isAuthenticated ? ButtonType.Button : ButtonType.Submit}
          ariaLabel={isWideScreens ? undefined : PrimaryButtonId.AuthButton}
          variant={isWideScreens ? VariantButton.Primary : VariantButton.Small}
          onHandleClick={!isAuthenticated ? onOpenModal : handleSignOut}
          hasIcon={true}
          svgName={isAuthenticated ? IconName.SignOut : IconName.Auth}
          svgSize={isWideScreens ? IconSizes.mdIcon28 : IconSizes.mdIcon24}
          classNameIcon='fill-whiteBase'
          classNameButton={buttonStyles}
        >
          {buttonText}
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
