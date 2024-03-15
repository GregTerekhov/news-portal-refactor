import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthRedux } from 'reduxStore/hooks';

import type { MainCredentials, AuthInputs } from 'types';
import { useNotification, useScrollBodyContext } from 'contexts';

import { usePopUp } from 'hooks';

import { signUpSchema } from '../assistants';

const useSignUp = () => {
  const { setOpenToast } = useNotification();
  const { setIsScrollDisabled } = useScrollBodyContext();
  const { register, login } = useAuthRedux();
  const { toggleModal } = usePopUp();

  const {
    handleSubmit,
    register: registration,
    reset,
    getValues,
    formState: { errors },
  } = useForm<MainCredentials>({ resolver: yupResolver(signUpSchema) });

  const signUpSubmitHandler: SubmitHandler<MainCredentials> = async (data) => {
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
        toggleModal;
        setIsScrollDisabled(false);
        return;
      } else {
        await login(signInCredentials);
      }
    } catch (error) {
      console.error('Error during signUp:', error);
    } finally {
      reset({
        ...getValues,
        name: '',
        email: '',
        password: '',
      });
      toggleModal;
      setIsScrollDisabled(false);
    }
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
      autofill: 'email',
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
