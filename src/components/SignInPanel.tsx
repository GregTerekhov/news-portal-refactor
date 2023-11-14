import React from 'react';

import { useWindowWidth } from 'hooks';

import { Input, PrimaryButton } from 'ui';

import ThemeSwitcher from './ThemeSwitcher';

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
  return (
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
