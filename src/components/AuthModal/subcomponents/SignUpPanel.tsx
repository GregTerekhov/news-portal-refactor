import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignUpCredentials } from 'types';
import { useAuthCollector, usePopUp, useWindowWidth } from 'hooks';

import { ThemeSwitcher } from 'components';
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

  return (
    <form onSubmit={handleSignUpSubmit(handleSignUpSubmitHandler)}>
      <div className='flex flex-col gap-2 md:gap-3.5 mb-6'>
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
      <p className='text-darkBase dark:text-whiteBase text-end mb-4 transition-colors duration-500'>
        Click if you have accounts in:
      </p>
      {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
        <ul className='flex justify-evenly gap-6 mb-8'>
          <li>
            <PrimaryButton
              variant='Small'
              hasIcon={true}
              svgName='icon-google'
              svgSize={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
              ariaLabel='Google account binding'
              classNameButton='bg-accentBase hover:bg-accentAlt dark:border-whiteBase py-2'
              classNameIcon='fill-whiteBase'
            />
          </li>
          <li>
            <PrimaryButton
              variant='Small'
              hasIcon={true}
              svgName='icon-facebook'
              svgSize={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
              ariaLabel='Facebook account binding'
              classNameButton='bg-accentBase hover:bg-accentAlt dark:border-whiteBase py-2'
              classNameIcon='fill-whiteBase'
            />
          </li>
          <li>
            <PrimaryButton
              variant='Small'
              hasIcon={true}
              svgName='icon-apple'
              svgSize={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
              ariaLabel='Apple account binding'
              classNameButton='bg-accentBase hover:bg-accentAlt dark:border-whiteBase py-2'
              classNameIcon='fill-whiteBase'
            />
          </li>
        </ul>
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
          <ul className='flex gap-6'>
            <li>
              <PrimaryButton
                variant='Small'
                hasIcon={true}
                svgName='icon-google'
                svgSize={
                  breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                }
                ariaLabel='Google account binding'
                classNameButton='bg-accentBase hover:bg-accentAlt dark:border-whiteBase py-2'
                classNameIcon='fill-whiteBase'
              />
            </li>
            <li>
              <PrimaryButton
                variant='Small'
                hasIcon={true}
                svgName='icon-facebook'
                svgSize={
                  breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                }
                ariaLabel='Facebook account binding'
                classNameButton='bg-accentBase hover:bg-accentAlt dark:border-whiteBase py-2'
                classNameIcon='fill-whiteBase'
              />
            </li>
            <li>
              <PrimaryButton
                variant='Small'
                hasIcon={true}
                svgName='icon-apple'
                svgSize={
                  breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                }
                ariaLabel='Apple account binding'
                classNameButton='bg-accentBase hover:bg-accentAlt dark:border-whiteBase py-2'
                classNameIcon='fill-whiteBase'
              />
            </li>
          </ul>
        ) : null}
        {breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? (
          <ThemeSwitcher variant='modal' />
        ) : null}
      </div>
    </form>
  );
};

export default SignUpPanel;
