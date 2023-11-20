import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignUpCredentials } from 'types';

import { signUpSchema } from 'helpers';
import { useAuthCollector, usePopUp, useWindowWidth } from 'hooks';

import { PrimaryButton, VerifiableInput } from 'ui';

import ThemeSwitcher from './ThemeSwitcher';

const SignUpPanel: FC<{}> = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const { register, login } = useAuthCollector();
  const { toggleModal } = usePopUp();

  const {
    handleSubmit: handleSignUpSubmit,
    register: registerSignUp,
    reset,
    getValues,
    formState: { errors: signUpErrors },
  } = useForm<SignUpCredentials>({ resolver: yupResolver(signUpSchema) });

  const handleSignUpSubmitHandler: SubmitHandler<SignUpCredentials> = async (data) => {
    console.log('SignUp data', data);
    const { name, email, password } = data;

    const signUpCredentials = {
      name,
      email,
      password,
    };

    const signInCredentials = {
      email,
      password,
    };

    const response = await register(signUpCredentials);

    if (
      response.payload === 'Email already in use' ||
      response.payload === 'All sign-up fields are required'
    ) {
      return;
    } else {
      const response = await login(signInCredentials);

      if (response.payload === 'User is not authentified') {
        console.log('Email or password are wrong');
        return;
      }
    }
    reset({
      ...getValues,
      name: '',
      email: '',
      password: '',
    });
    toggleModal();
  };

  return (
    <form className='' onSubmit={handleSignUpSubmit(handleSignUpSubmitHandler)}>
      <div className='flex flex-col gap-3.5 mb-8'>
        <VerifiableInput
          inputData={{
            type: 'text',
            placeholder: 'Enter your name',
            children: 'Name',
          }}
          errors={signUpErrors?.name && signUpErrors?.name?.message}
          register={registerSignUp}
          label='name'
          hasIcon={false}
          variant='auth'
          ariaInvalid={signUpErrors?.name ? 'true' : 'false'}
        />
        <VerifiableInput
          inputData={{
            placeholder: 'Enter your email',
            children: 'Email',
          }}
          errors={signUpErrors?.email?.message}
          register={registerSignUp}
          label='email'
          hasIcon={false}
          variant='auth'
          ariaInvalid={signUpErrors?.email ? 'true' : 'false'}
        />
        <VerifiableInput
          inputData={{
            type: 'password',
            placeholder: 'Enter your password',
            children: 'Password',
          }}
          errors={signUpErrors?.password?.message}
          register={registerSignUp}
          label='password'
          hasIcon={false}
          variant='auth'
          ariaInvalid={signUpErrors?.password ? 'true' : 'false'}
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
    </form>
  );
};

export default SignUpPanel;
