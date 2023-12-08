import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SignUpRequiredFields } from 'types';
import { useAuthCollector, usePopUp } from 'hooks';

import { signUpSchema } from '../assistants';

const useSignUp = () => {
  const { register, login } = useAuthCollector();
  const { toggleModal } = usePopUp();

  const {
    handleSubmit,
    register: registration,
    reset,
    getValues,
    formState: { errors },
  } = useForm<SignUpRequiredFields>({ resolver: yupResolver(signUpSchema) });

  const signUpSubmitHandler: SubmitHandler<SignUpRequiredFields> = async (data) => {
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
