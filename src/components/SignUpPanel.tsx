import React, { useState } from 'react';

import { useAppDispatch } from 'reduxStore/hooks';
import { signIn, signUp } from 'reduxStore/auth';

import { usePopUp, useWindowWidth } from 'hooks';

import { Input, PrimaryButton } from 'ui';

import ThemeSwitcher from './ThemeSwitcher';

const SignUpPanel = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const { toggleModal } = usePopUp();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetInput = e.target.name;
    const inputValue = e.target.value;

    switch (targetInput) {
      case 'name':
        setName(inputValue);
        break;
      case 'email':
        setEmail(inputValue);
        break;
      case 'password':
        setPassword(inputValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const signUpCredentials = {
      name,
      email,
      password,
    };

    const signInCredentials = {
      email,
      password,
    };

    console.log(signUpCredentials);
    console.log(signInCredentials);

    const response = await dispatch(signUp(signUpCredentials));

    if (
      response.payload === 'Request failed with status code 409' ||
      response.payload === 'Request failed with status code 400'
    ) {
      return;
    } else {
      const response = await dispatch(signIn(signInCredentials));

      if (response.payload === 'Request failed with status code 401') {
        console.log('Email or password are wrong');
      }
    }
    toggleModal();
  };

  return (
    <form className='' onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
      <div className='flex flex-col gap-3.5 mb-8'>
        <Input
          inputData={{
            name: 'name',
            type: 'text',
            placeholder: 'Enter your name',
            children: 'Name',
            required: true,
          }}
          hasIcon={false}
          variant='auth'
          onChange={handleInputChange}
        />
        <Input
          inputData={{
            name: 'email',
            type: 'email',
            placeholder: 'Enter your email',
            children: 'Email',
            required: true,
          }}
          hasIcon={false}
          variant='auth'
          onChange={handleInputChange}
        />
        <Input
          inputData={{
            name: 'password',
            type: 'password',
            placeholder: 'Enter your password',
            children: 'Password',
            required: true,
          }}
          hasIcon={false}
          variant='auth'
          onChange={handleInputChange}
        />
      </div>
      {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
        <PrimaryButton
          id='Google authentication button'
          svgName='icon-google'
          svgSize={16}
          classNameIcon='fill-whiteBase'
          variant='Primary'
          hasIcon={true}
          classNameButton='mb-6'
        >
          Authentication
        </PrimaryButton>
      ) : null}
      <div className='flex justify-between items-center'>
        <PrimaryButton
          buttonData={{ type: 'submit' }}
          id='Registration button'
          variant='OtherButton'
          width='w-32'
        >
          Register
        </PrimaryButton>
        {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? (
          <PrimaryButton
            id='Google authentication button'
            svgName='icon-google'
            svgSize={18}
            classNameIcon='fill-whiteBase'
            variant='OtherButton'
            hasIcon={true}
            width='w-44'
          >
            Authentication
          </PrimaryButton>
        ) : null}
        {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
          <ThemeSwitcher variant='modal' />
        ) : null}
      </div>
      <div>
        <button
          data-tooltip-target='tooltip-right'
          data-tooltip-placement='right'
          type='button'
          className='ms-3 mb-2 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Tooltip right
        </button>

        <p
          id='tooltip-right'
          role='tooltip'
          className='absolute z-100 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
        >
          Tooltip on right
          <span className='tooltip-arrow' data-popper-arrow></span>
        </p>
      </div>
    </form>
  );
};

export default SignUpPanel;
