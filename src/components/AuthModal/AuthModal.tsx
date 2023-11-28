import React, { FC, useState } from 'react';
import { Tab } from '@headlessui/react';

import { SignUpPanel, SignInPanel, ChangePassword } from './subcomponents';
interface IAuthModalProps {
  passwordToken?: boolean;
}

const AuthModal: FC<IAuthModalProps> = ({ passwordToken }) => {
  const [isShowRecoveryInput, setIsShowRecoveryInput] = useState<boolean>(false);

  const handleShowRecoveryInput = () => {
    setIsShowRecoveryInput(!isShowRecoveryInput);
  };

  return (
    <>
      {passwordToken ? (
        <ChangePassword />
      ) : (
        <Tab.Group>
          <Tab.List className='w-full h-[60px] flex mb-4 justify-between border-solid border-fullDark/[.2] border-b-[1px] dark:border-whiteBase/[.2] transition-colors duration-500'>
            <div className='flex gap-3.5'>
              <Tab
                className='text-xl ui-selected:font-medium text-darkBase dark:text-whiteBase ui-selected:text-accentBase dark:ui-selected:text-accentBase transition-colors duration-500'
                onClick={() => setIsShowRecoveryInput(false)}
              >
                Register
              </Tab>
              <Tab className='text-xl ui-selected:font-medium text-darkBase dark:text-whiteBase ui-selected:text-accentBase dark:ui-selected:text-accentBase transition-colors duration-500'>
                Log In
              </Tab>
            </div>
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
      )}
    </>
  );
};

export default AuthModal;
