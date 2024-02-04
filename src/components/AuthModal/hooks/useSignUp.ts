import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthRedux } from 'reduxStore/hooks';

import type { SignUpRequest } from 'types';

import { useNotification } from 'contexts';
import { usePopUp } from 'hooks';

import { signUpSchema } from '../assistants';
import { AuthInputs } from '../types';

const useSignUp = () => {
  const { setOpenToast } = useNotification();
  const { register, login } = useAuthRedux();
  const { toggleModal } = usePopUp();

  const {
    handleSubmit,
    register: registration,
    reset,
    getValues,
    formState: { errors },
  } = useForm<SignUpRequest>({ resolver: yupResolver(signUpSchema) });

  const signUpSubmitHandler: SubmitHandler<SignUpRequest> = async (data) => {
    try {
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

      const signUpResponse = await register(signUpCredentials);

      if (signUpResponse.meta.requestStatus === 'rejected') {
        setOpenToast(true);
        return;
      } else {
        await login(signInCredentials);
      }
    } catch (error) {
      console.error('Error during signUp:', error);
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
      autoFocus: true,
    },
    {
      type: 'email',
      placeholder: 'Enter your email',
      children: 'Email',
      errors: errors?.email?.message,
      label: 'email',
      ariaInvalid: errors?.email ? true : false,
      autoFocus: false,
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      children: 'Password',
      errors: errors?.password?.message,
      label: 'password',
      ariaInvalid: errors?.password ? true : false,
      autoFocus: false,
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
