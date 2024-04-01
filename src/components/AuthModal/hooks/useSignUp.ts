import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import type { MainCredentials, AuthInputs } from 'types';
import { usePopUp } from 'hooks';

import { signUpSchema } from '../assistants';

const useSignUp = () => {
  const { register, login } = useAuthRedux();
  const { showToast } = useNotificationContext();
  const { setIsScrollDisabled } = useScrollBodyContext();

  const { toggleModal } = usePopUp();

  // хук useForm react-hook-form для signUp-операції
  const {
    handleSubmit,
    register: registration,
    reset,
    getValues,
    formState: { errors },
  } = useForm<MainCredentials>({ resolver: yupResolver(signUpSchema) });

  //Функція-submit
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
        showToast(signUpResponse.meta.requestStatus);
        toggleModal;
        setIsScrollDisabled(false);
        return;
      } else {
        const response = await login(signInCredentials);

        showToast(response.meta.requestStatus);
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

  // Data для signUp-інпутів
  const signUpInputs: Array<AuthInputs> = [
    {
      type: 'text',
      placeholder: 'Enter your name',
      labelName: 'Name',
      errors: errors?.name?.message,
      label: 'name',
      ariaInvalid: errors?.name ? true : false,
      autoFocus: true,
      disabled: false,
    },
    {
      type: 'email',
      placeholder: 'Enter your email',
      labelName: 'Email',
      errors: errors?.email?.message,
      label: 'email',
      ariaInvalid: errors?.email ? true : false,
      autoFocus: false,
      autofill: 'email',
      disabled: false,
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      labelName: 'Password',
      errors: errors?.password?.message,
      label: 'password',
      ariaInvalid: errors?.password ? true : false,
      autoFocus: false,
      disabled: false,
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
