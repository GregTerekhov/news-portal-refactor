import { useWindowWidth } from 'hooks';
import React from 'react';
import { Input, PrimaryButton } from 'ui';
import ThemeSwitcher from './ThemeSwitcher';

const SignUpPanel = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  return (
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
      {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
        <PrimaryButton
          id='Google authentication button'
          buttonData={{ type: 'button' }}
          svgName='icon-google'
          svgSize={16}
          classNameIcon='fill-whiteBase'
          variant='SearchBlock'
          hasIcon={true}
        >
          Authentication
        </PrimaryButton>
      ) : null}
      <div className='flex justify-between items-center'>
        <PrimaryButton
          buttonData={{ type: 'submit' }}
          id='Registration button'
          variant='OtherButton'
        >
          Register
        </PrimaryButton>
        {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? (
          <PrimaryButton
            id='Google authentication button'
            buttonData={{ type: 'button' }}
            svgName='icon-google'
            svgSize={16}
            classNameIcon='fill-whiteBase'
            variant='OtherButton'
            hasIcon={true}
          >
            Authentication
          </PrimaryButton>
        ) : null}
        {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
          <ThemeSwitcher variant='modal' />
        ) : null}
      </div>
    </form>
  );
};

export default SignUpPanel;
