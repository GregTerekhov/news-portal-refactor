import React, { useState } from 'react';

import { useAppDispatch } from 'reduxStore/hooks';

import { usePopUp, useWindowWidth } from 'hooks';

import { Input, PrimaryButton } from 'ui';

import ThemeSwitcher from './ThemeSwitcher';
import { signIn } from 'reduxStore/auth';

interface SignInProps {
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowRecoveryInput: () => void;
  isShowRecoveryInput: boolean;
}

const SignInPanel = ({
  handleCheckboxChange,
  handleShowRecoveryInput,
  isShowRecoveryInput,
}: SignInProps) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();

  const { toggleModal } = usePopUp();

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const targetInput = e.currentTarget.name;
    const inputValue = e.currentTarget.value;

    switch (targetInput) {
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

    const credentials = {
      email,
      password,
    };

    console.log(credentials);
    await dispatch(signIn(credentials));
    toggleModal();
  };

  return (
    <form className='flex flex-col gap-3.5' onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
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
      <div className='text-center'>
        <button
          id='Show password recovery input'
          type='button'
          className='text-small md:text-medium text-darkBase dark:text-whiteBase'
          onClick={handleShowRecoveryInput}
        >
          Forgot password?
        </button>
        {isShowRecoveryInput ? (
          <Input
            inputData={{
              name: 'recoveryEmail',
              type: 'email',
              placeholder: 'Enter your email',
            }}
            hasIcon={false}
            variant='auth'
          />
        ) : null}
      </div>
      <Input
        inputData={{
          name: 'checkbox',
          type: 'checkbox',
          children: 'Remember me',
          required: true,
        }}
        hasIcon={false}
        variant='checkbox'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(event)}
      />
      <div className='max-md:flex max-md:justify-between max-md:items-center'>
        <PrimaryButton
          buttonData={{ type: 'submit' }}
          id='Login button'
          variant='OtherButton'
          classNameButton='w-32'
        >
          Log In
        </PrimaryButton>
        {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
          <ThemeSwitcher variant='modal' />
        ) : null}
      </div>
    </form>
  );
};

export default SignInPanel;
