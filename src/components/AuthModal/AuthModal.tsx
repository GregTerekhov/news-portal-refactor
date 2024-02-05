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

  const hideForgotPasswordInput = (index: number) => {
    if (index === 0) {
      setIsShowRecoveryInput(false);
    }
  };
  const tabListStyles =
    'mb-4 flex h-[60px] w-full gap-3.5 border-b-[1px] border-solid border-fullDark/[.2] transition-colors duration-500 dark:border-whiteBase/[.2]';
  const tabStyles =
    'text-xl text-darkBase transition-colors duration-500 ui-selected:font-medium ui-selected:text-accentBase dark:text-whiteBase dark:ui-selected:text-accentBase';

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
              hideForgotPasswordInput(index);
            }}
          >
            <Tab.List className={`${tabListStyles}`}>
              <Tab className={`${tabStyles}`} data-autofocus>
                Register
              </Tab>
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
          <a href='https://news-webapp-express.onrender.com/api/auth/google'>Google Acc</a>
        </FocusLock>
      )}
    </>
  );
};

export default AuthModal;
