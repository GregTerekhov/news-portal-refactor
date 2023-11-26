import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignUpCredentials } from 'types';
import { useAuthCollector, usePopUp, useWindowWidth } from 'hooks';

import { LinkedAccounts, ThemeSwitcher } from 'components';
import { PrimaryButton, VerifiableInput } from 'ui';

import { signUpSchema } from '../assistants';

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

  const signUpInputs = [
    {
      type: 'text',
      placeholder: 'Enter your name',
      children: 'Name',
      errors: signUpErrors?.name?.message,
      label: 'name',
      ariaInvalid: signUpErrors?.name ? true : false,
    },
    {
      type: '',
      placeholder: 'Enter your email',
      children: 'Email',
      errors: signUpErrors?.email?.message,
      label: 'email',
      ariaInvalid: signUpErrors?.email ? true : false,
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      children: 'Password',
      errors: signUpErrors?.password?.message,
      label: 'password',
      ariaInvalid: signUpErrors?.password ? true : false,
    },
  ];

  return (
    <form onSubmit={handleSignUpSubmit(handleSignUpSubmitHandler)}>
      <ul className='flex flex-col gap-4 md:gap-5 mb-6'>
        {Array.isArray(signUpInputs) &&
          signUpInputs.map(({ type, placeholder, children, errors, label, ariaInvalid }) => (
            <li key={label}>
              <VerifiableInput
                inputData={{ type, placeholder, children }}
                errors={errors}
                register={registerSignUp}
                label={label}
                hasIcon={false}
                variant='auth'
                ariaInvalid={ariaInvalid}
              />
            </li>
          ))}
      </ul>
      <p className='text-darkBase dark:text-whiteBase md:text-end mb-4 transition-colors duration-500'>
        Click if you have accounts in:
      </p>
      {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
        <LinkedAccounts />
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
          <LinkedAccounts />
        ) : null}
        {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
          <ThemeSwitcher variant='modal' />
        ) : null}
      </div>
    </form>
  );
};

export default SignUpPanel;
