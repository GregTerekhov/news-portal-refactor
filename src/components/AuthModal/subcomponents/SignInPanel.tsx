import React, { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignInCredentials, IRecoveryPassword } from 'types';
import { useAuthCollector, usePopUp, useWindowWidth } from 'hooks';

import { ThemeSwitcher } from 'components';
import { PrimaryButton, UnverifiableInput, VerifiableInput } from 'ui';

import { signInSchema, recoveryPasswordSchema } from '../assistants';

interface SignInProps {
  handleShowRecoveryInput: () => void;
  isShowRecoveryInput: boolean;
}

const SignInPanel: FC<SignInProps> = ({ handleShowRecoveryInput, isShowRecoveryInput }) => {
  const [isChecked, setIsChecked] = useState<boolean>(() => !!localStorage.rememberMe);
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { login } = useAuthCollector();
  const { toggleModal } = usePopUp();

  const {
    handleSubmit: handleSignInSubmit,
    register: registerSignIn,
    reset,
    watch,
    getValues,
    formState: { errors: signInErrors },
  } = useForm<SignInCredentials>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: localStorage.rememberMe ? localStorage.userEmail : '',
      password: localStorage.rememberMe ? localStorage.userPassword : '',
    },
  });

  const {
    handleSubmit: handleRecoveryPasswordSubmit,
    register: registerRecovery,
    resetField,
    formState: { errors: recoveryPasswordErrors },
  } = useForm<IRecoveryPassword>({ resolver: yupResolver(recoveryPasswordSchema) });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isRememberMe = event.target.checked;
    setIsChecked(isRememberMe);
    console.log('isRememberMe', isRememberMe, typeof isRememberMe);
  };

  const [email, password] = watch(['email', 'password']);

  const handleSignInSubmitHandler: SubmitHandler<SignInCredentials> = async (data, e) => {
    e?.preventDefault();
    const { email, password } = data;
    console.log('SignIn data', data);

    if (isChecked && email !== '') {
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);
      localStorage.setItem('rememberMe', isChecked.toString());
    }

    const signInCredentials = {
      email,
      password,
    };

    const response = await login(signInCredentials);

    if (response.payload === 'User is not authentified') {
      console.log('Email or password are wrong');
      return;
    }
    reset({
      ...getValues,
      email: '',
      password: '',
    });

    toggleModal();
  };

  const handleRecoverySubmitHandler: SubmitHandler<IRecoveryPassword> = async (data, e) => {
    e?.stopPropagation();
    e?.preventDefault();
    console.log('Recovery email', data);
    resetField('recoveryEmail');
  };

  return (
    <form
      className='flex flex-col gap-3.5'
      onSubmit={handleSignInSubmit(handleSignInSubmitHandler)}
    >
      <VerifiableInput
        inputData={{
          placeholder: 'Enter your email',
          children: 'Email',
          fieldValue: email,
        }}
        errors={signInErrors?.email?.message}
        register={registerSignIn}
        label='email'
        hasIcon={false}
        variant='auth'
        ariaInvalid={signInErrors?.email ? 'true' : 'false'}
      />
      <VerifiableInput
        inputData={{
          type: 'password',
          placeholder: 'Enter your password',
          children: 'Password',
          fieldValue: password,
        }}
        errors={signInErrors?.password?.message}
        register={registerSignIn}
        label='password'
        hasIcon={false}
        variant='auth'
        ariaInvalid={signInErrors?.password ? 'true' : 'false'}
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
          <VerifiableInput
            inputData={{
              placeholder: 'Enter your email',
            }}
            errors={recoveryPasswordErrors?.recoveryEmail?.message}
            register={registerRecovery}
            handleSubmitRecovery={handleRecoveryPasswordSubmit(handleRecoverySubmitHandler)}
            label='recoveryEmail'
            hasIcon={false}
            variant='auth'
            ariaInvalid={recoveryPasswordErrors?.recoveryEmail ? 'true' : 'false'}
          />
        ) : null}
      </div>
      <UnverifiableInput
        inputData={{
          name: 'checkbox',
          type: 'checkbox',
          children: 'Remember me',
        }}
        isChecked={isChecked}
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
