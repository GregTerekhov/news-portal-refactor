import React, { FC, useState } from 'react';
import { Tab } from '@headlessui/react';
import { RemoveScroll } from 'react-remove-scroll';

import { SignUpPanel, SignInPanel, ChangePassword } from './subcomponents';

interface IAuthModalProps {
  passwordToken?: boolean | undefined;
  isOpenModal: boolean;
}

const SIGN_IN_TAB_IDX = 1;
const SIGN_UP_TAB_IDX = 0;

const AuthModal: FC<IAuthModalProps> = ({ passwordToken, isOpenModal }) => {
  const isCredentialsRemembered = localStorage.getItem('rememberMe');

  const [isShowRecoveryInput, setIsShowRecoveryInput] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(
    isCredentialsRemembered ? SIGN_IN_TAB_IDX : SIGN_UP_TAB_IDX,
  );

  const handleShowRecoveryInput = (): void => {
    setIsShowRecoveryInput(!isShowRecoveryInput);
  };

  const hideForgotPasswordInput = (index: number): void => {
    if (index === 0) {
      setIsShowRecoveryInput(false);
    }
  };
  const tabListStyles =
    'mb-4 flex h-60px w-full gap-x-3.5 hg:gap-x-5 border-b border-solid border-fullDark/[.2] transition-colors dark:border-whiteBase/[.2]';
  const tabStyles =
    'text-xl text-darkBase transition-colors ui-selected:font-medium ui-selected:text-accentBase dark:text-whiteBase dark:ui-selected:text-accentBase hg:text-3xl';

  return (
    <>
      {passwordToken && isOpenModal ? (
        <ChangePassword />
      ) : (
        <RemoveScroll enabled={isOpenModal}>
          <Tab.Group
            defaultIndex={SIGN_UP_TAB_IDX}
            selectedIndex={selectedTab}
            onChange={(index) => {
              setSelectedTab(index);
              hideForgotPasswordInput(index);
            }}
          >
            <Tab.List className={`${tabListStyles}`}>
              <Tab className={`${tabStyles}`}>Register</Tab>
              <Tab className={`${tabStyles}`}>Log In</Tab>
            </Tab.List>
            <Tab.Panels className='pb-4'>
              <Tab.Panel>
                <SignUpPanel />
              </Tab.Panel>
              <Tab.Panel>
                <SignInPanel
                  isShowRecoveryInput={isShowRecoveryInput}
                  handleShowRecoveryInput={handleShowRecoveryInput}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </RemoveScroll>
      )}
    </>
  );
};

export default AuthModal;
