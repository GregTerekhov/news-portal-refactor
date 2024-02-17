import React, { FC, useState } from 'react';
import { Tab } from '@headlessui/react';

import { SignUpPanel, SignInPanel, ChangePassword } from './subcomponents';
import { RemoveScroll } from 'react-remove-scroll';
import usePopUp from 'hooks/usePopUp';

interface IAuthModalProps {
  passwordToken?: boolean;
}

const AuthModal: FC<IAuthModalProps> = ({ passwordToken }) => {
  const [isShowRecoveryInput, setIsShowRecoveryInput] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { isOpenModal } = usePopUp();
  const handleShowRecoveryInput = (): void => {
    setIsShowRecoveryInput(!isShowRecoveryInput);
  };

  const hideForgotPasswordInput = (index: number): void => {
    if (index === 0) {
      setIsShowRecoveryInput(false);
    }
  };
  const tabListStyles =
    'mb-4 flex h-60px w-full gap-3.5 border-b border-solid border-fullDark/[.2] transition-colors dark:border-whiteBase/[.2]';
  const tabStyles =
    'text-xl text-darkBase transition-colors ui-selected:font-medium ui-selected:text-accentBase dark:text-whiteBase dark:ui-selected:text-accentBase';

  return (
    <>
      {passwordToken ? (
        <ChangePassword />
      ) : (
        <RemoveScroll enabled={isOpenModal}>
          <Tab.Group
            defaultIndex={0}
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
