import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SignInRequiredFields } from 'types';

import { useAuthCollector, usePopUp } from 'hooks';

import { signInSchema } from '../assistants';

const useSignIn = () => {
  const [isChecked, setIsChecked] = useState<boolean>(() => !!localStorage.rememberMe);
  const { login } = useAuthCollector();
  const { toggleModal } = usePopUp();

  const {
    handleSubmit,
    register: registration,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm<SignInRequiredFields>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: localStorage.rememberMe ? localStorage.userEmail : '',
      password: localStorage.rememberMe ? localStorage.userPassword : '',
    },
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isRememberMe = event.target.checked;
    setIsChecked(isRememberMe);
  };

  const [email, password] = watch(['email', 'password']);

  const signInSubmitHandler: SubmitHandler<SignInRequiredFields> = async (data, e) => {
    e?.preventDefault();
    const { email, password } = data;

    // if (isChecked && email !== '') {
    //   localStorage.setItem('userEmail', email);
    //   localStorage.setItem('userPassword', password);
    //   localStorage.setItem('rememberMe', isChecked.toString());
    // }

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

  const signInInputs = [
    {
      type: 'email',
      placeholder: 'Enter your email',
      children: 'Email',
      fieldValue: email,
      errors: errors?.email?.message,
      label: 'email',
      ariaInvalid: errors?.email ? true : false,
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      children: 'Password',
      fieldValue: password,
      errors: errors?.password?.message,
      label: 'password',
      ariaInvalid: errors?.password ? true : false,
    },
  ];

  return {
    handleSubmit,
    registration,
    handleCheckboxChange,
    signInSubmitHandler,
    signInInputs,
    isChecked,
  };
};

export default useSignIn;
