import React from 'react';
import { Input, PrimaryButton } from 'ui';
import { Tab } from '@headlessui/react';
import ThemeSwitcher from './ThemeSwitcher';
import { useWindowWidth } from 'hooks';

const AuthModal = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  return (
    <>
      <Tab.Group>
        <Tab.List className='w-full h-[60px] flex mb-4 justify-between border-solid border-fullDark/[.2] border-b-[1px] dark:border-whiteBase/[.2] transition-colors duration-500'>
          <div className='flex gap-3.5'>
            <Tab className='text-xl ui-selected:font-medium text-darkBase dark:text-whiteBase ui-selected:text-accentBase dark:ui-selected:text-accentBase ui-selected:font-bold transition-colors duration-500'>
              Register
            </Tab>
            <Tab className='text-xl ui-selected:font-medium text-darkBase dark:text-whiteBase ui-selected:text-accentBase dark:ui-selected:text-accentBase ui-selected:font-bold transition-colors duration-500'>
              Log In
            </Tab>
          </div>
          {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? (
            <ThemeSwitcher variant='modal' />
          ) : null}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <form className='flex flex-col gap-3.5'>
              <Input
                inputData={{
                  name: 'name',
                  type: 'text',
                  placeholder: 'Enter your name',
                  children: 'Name',
                }}
                hasIcon={false}
                variant='auth'
              />
              <Input
                inputData={{
                  name: 'email',
                  type: 'email',
                  placeholder: 'Enter your email',
                  children: 'Email',
                }}
                hasIcon={false}
                variant='auth'
              />
              <Input
                inputData={{
                  name: 'password',
                  type: 'password',
                  placeholder: 'Enter your password',
                  children: 'Password',
                }}
                hasIcon={false}
                variant='auth'
              />
              <div className='max-md:flex max-md:justify-between max-md:items-center'>
                <PrimaryButton
                  buttonData={{ type: 'submit' }}
                  id='Registration button'
                  variant='OtherButton'
                >
                  Register
                </PrimaryButton>
                {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
                  <ThemeSwitcher variant='modal' />
                ) : null}
              </div>
            </form>
          </Tab.Panel>
          <Tab.Panel>
            <form className='flex flex-col gap-3.5'>
              <Input
                inputData={{
                  name: 'email',
                  type: 'email',
                  placeholder: 'Enter your email',
                  children: 'Email',
                }}
                hasIcon={false}
                variant='auth'
              />
              <Input
                inputData={{
                  name: 'password',
                  type: 'password',
                  placeholder: 'Enter your password',
                  children: 'Password',
                }}
                hasIcon={false}
                variant='auth'
              />
              <Input
                inputData={{
                  name: 'checkbox',
                  type: 'checkbox',
                  children: 'Remember me',
                }}
                hasIcon={false}
                variant='checkbox'
              />
              <div className='max-md:flex max-md:justify-between max-md:items-center'>
                <PrimaryButton
                  buttonData={{ type: 'submit' }}
                  id='Login button'
                  variant='OtherButton'
                >
                  Log In
                </PrimaryButton>
                {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
                  <ThemeSwitcher variant='modal' />
                ) : null}
              </div>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default AuthModal;
