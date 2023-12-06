import React, { FC, useState } from 'react';
import { Tab } from '@headlessui/react';
import FocusLock from 'react-focus-lock';

import { usePopUp } from 'hooks';

import { SignUpPanel, SignInPanel, ChangePassword } from './subcomponents';
interface IAuthModalProps {
  passwordToken?: boolean;
}

const AuthModal: FC<IAuthModalProps> = ({ passwordToken }) => {
  const [isShowRecoveryInput, setIsShowRecoveryInput] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { isOpenModal } = usePopUp();

  const handleShowRecoveryInput = () => {
    setIsShowRecoveryInput(!isShowRecoveryInput);
  };

  return (
    <>
      {passwordToken ? (
        <ChangePassword />
      ) : (
        <FocusLock disabled={!isOpenModal} autoFocus={false}>
          <Tab.Group
            defaultIndex={0}
            selectedIndex={selectedTab}
            onChange={(index) => {
              setSelectedTab(index);
              if (index === 0) {
                setIsShowRecoveryInput(false);
              }
            }}
          >
            <Tab.List className='w-full h-[60px] flex mb-4 gap-3.5 border-solid border-fullDark/[.2] border-b-[1px] dark:border-whiteBase/[.2] transition-colors duration-500'>
              <Tab
                className='text-xl ui-selected:font-medium text-darkBase dark:text-whiteBase ui-selected:text-accentBase dark:ui-selected:text-accentBase transition-colors duration-500'
                data-autofocus
              >
                Register
              </Tab>
              <Tab className='text-xl ui-selected:font-medium text-darkBase dark:text-whiteBase ui-selected:text-accentBase dark:ui-selected:text-accentBase transition-colors duration-500'>
                Log In
              </Tab>
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
        </FocusLock>
      )}
    </>
  );
};

export default AuthModal;
