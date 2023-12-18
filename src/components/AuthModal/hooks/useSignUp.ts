import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CredentialSignUpResponse, SignUpRequest } from 'types';

import { useNotification } from 'contexts';
import { useAuthCollector, usePopUp } from 'hooks';

import { signUpSchema } from '../assistants';
import { AuthInputs } from '../types';
import { useEffect } from 'react';
import { useAppSelector } from 'reduxStore/hooks';
import { selectHasAuthError } from 'reduxStore/auth';

const useSignUp = () => {
  const { setOpenToast } = useNotification();
  const { register, login } = useAuthCollector();
  const { toggleModal } = usePopUp();
  const hasError = useAppSelector(selectHasAuthError);

  useEffect(() => {
    if (hasError) console.log('hasError', hasError);
  }, [hasError]);

  const {
    handleSubmit,
    register: registration,
    reset,
    getValues,
    formState: { errors },
  } = useForm<SignUpRequest>({ resolver: yupResolver(signUpSchema) });

  const signUpSubmitHandler: SubmitHandler<SignUpRequest> = async (data) => {
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
      response.meta.requestStatus &&
      response.meta.requestStatus === 'rejected' &&
      response.payload === 'Email already in use'
    ) {
      console.log('response.payload', response.payload);
      setOpenToast(true);
      return;
    } else {
      const response = await login(signInCredentials);
      const payload = response.payload as CredentialSignUpResponse;
      const { message } = payload;
      if (
        payload &&
        response.meta.requestStatus &&
        response.meta.requestStatus === 'fulfilled' &&
        message === 'User sign-in success'
      ) {
        setOpenToast(true);
      }

      if (
        response.meta.requestStatus &&
        response.meta.requestStatus === 'rejected' &&
        response.payload === 'User is not authentified'
      ) {
        console.log('Email or password are wrong');
        setOpenToast(true);
        return;
      }
    }
    reset({
      ...getValues,
      name: '',
      email: '',
      password: '',
    });
    toggleModal;
  };

  const signUpInputs: Array<AuthInputs> = [
    {
      type: 'text',
      placeholder: 'Enter your name',
      children: 'Name',
      errors: errors?.name?.message,
      label: 'name',
      ariaInvalid: errors?.name ? true : false,
    },
    {
      type: 'email',
      placeholder: 'Enter your email',
      children: 'Email',
      errors: errors?.email?.message,
      label: 'email',
      ariaInvalid: errors?.email ? true : false,
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      children: 'Password',
      errors: errors?.password?.message,
      label: 'password',
      ariaInvalid: errors?.password ? true : false,
    },
  ];

  return {
    handleSubmit,
    registration,
    signUpSubmitHandler,
    signUpInputs,
  };
};

export default useSignUp;
