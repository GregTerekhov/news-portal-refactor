import React from 'react';
import { Input, PrimaryButton } from 'ui';
import { Tab } from '@headlessui/react';
import ThemeSwitcher from './ThemeSwitcher';

const AuthModal = () => {
  return (
    <>
      <Tab.Group>
        <Tab.List className='w-full h-[60px] flex mb-4 justify-between border-solid border-line border-b-[1px] dark:border-darkThemeLine'>
          <div className='flex gap-3.5'>
            <Tab className='text-darkBase dark:text-whiteBase ui-selected:text-accentBase dark:ui-selected:text-accentBase ui-selected:font-bold'>
              Register
            </Tab>
            <Tab className='text-darkBase dark:text-whiteBase ui-selected:text-accentBase dark:ui-selected:text-accentBase ui-selected:font-bold'>
              Log In
            </Tab>
          </div>
          <ThemeSwitcher variant='modal' />
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
              <PrimaryButton buttonData={{ type: 'submit' }} variant='OtherButton'>
                Register
              </PrimaryButton>
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
              <PrimaryButton buttonData={{ type: 'submit' }} variant='OtherButton'>
                Log In
              </PrimaryButton>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default AuthModal;
