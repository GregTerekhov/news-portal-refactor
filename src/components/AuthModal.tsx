import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { useWindowWidth } from 'hooks';
import ThemeSwitcher from './ThemeSwitcher';
import SignUpPanel from './SignUpPanel';
import SignInPanel from './SignInPanel';

const AuthModal = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const [isShowRecoveryInput, setIsShowRecoveryInput] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    console.log('isChecked', isChecked, typeof isChecked);
  };

  const handleShowRecoveryInput = () => {
    setIsShowRecoveryInput(!isShowRecoveryInput);
  };

  return (
    <>
      <Tab.Group>
        <Tab.List className='w-full h-[60px] flex mb-4 justify-between border-solid border-fullDark/[.2] border-b-[1px] dark:border-whiteBase/[.2] transition-colors duration-500'>
          <div className='flex gap-3.5'>
            <Tab className='text-xl ui-selected:font-medium text-darkBase dark:text-whiteBase ui-selected:text-accentBase dark:ui-selected:text-accentBase transition-colors duration-500'>
              Register
            </Tab>
            <Tab className='text-xl ui-selected:font-medium text-darkBase dark:text-whiteBase ui-selected:text-accentBase dark:ui-selected:text-accentBase transition-colors duration-500'>
              Log In
            </Tab>
          </div>
          {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? (
            <ThemeSwitcher variant='modal' />
          ) : null}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <SignUpPanel />
          </Tab.Panel>
          <Tab.Panel>
            <SignInPanel
              isShowRecoveryInput={isShowRecoveryInput}
              handleCheckboxChange={handleCheckboxChange}
              handleShowRecoveryInput={handleShowRecoveryInput}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default AuthModal;
