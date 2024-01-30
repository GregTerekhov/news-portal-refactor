import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthRedux } from 'reduxStore/hooks';

import { AuthRequestWithoutName, CredentialSignInResponse } from 'types';

import { useNotification } from 'contexts';
import { usePopUp } from 'hooks';

import {
  getCheckboxState,
  loadUserDataFromLocalStorage,
  saveUserDataToLocalStorage,
  signInSchema,
} from '../assistants';
import { AuthInputs } from '../types';

const useSignIn = () => {
  const [isChecked, setIsChecked] = useState<boolean>(getCheckboxState());

  const { setOpenToast } = useNotification();
  const { login } = useAuthRedux();
  const { toggleModal } = usePopUp();

  const hasSavedCryptoUserData = localStorage.getItem('rememberMeData');

  useEffect(() => {
    const loadUserData = async () => {
      if (hasSavedCryptoUserData) {
        const loadedUserData = await loadUserDataFromLocalStorage();

        console.log('loadedUserData', loadedUserData);
        if (loadedUserData) {
          console.log('loadedUserData', loadedUserData);
          setValue('email', loadedUserData.email);
          setValue('password', loadedUserData.password);
        }
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    if (!isChecked) {
      localStorage.removeItem('rememberMeData');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('encryptionKey');
    }
  }, [isChecked]);

  const {
    handleSubmit,
    register: registration,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AuthRequestWithoutName>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isRememberMe = event.target.checked;
    setIsChecked(isRememberMe);
  };

  const [email, password] = watch(['email', 'password']); // споглядання за відповідними полями, щоб зберігати введені валідні значення для RememberMe

  const signInSubmitHandler: SubmitHandler<AuthRequestWithoutName> = async (data, e) => {
    e?.preventDefault();
    try {
      const { email, password } = data;

      if (isChecked && email !== '' && password !== '') {
        await saveUserDataToLocalStorage({ email, password });
        localStorage.rememberMe = isChecked.toString();
      }

      if (!isChecked) {
        localStorage.removeItem('rememberMeData');
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('encryptionKey');
      }

      const signInCredentials = {
        email,
        password,
      };

      const response = await login(signInCredentials);
      const { code, message } = response.payload as CredentialSignInResponse;

      if (response.meta.requestStatus === 'rejected') {
        setOpenToast(true);
        return;
      }
      if (code && message && code === 201 && message === 'User sign-in success') {
        setOpenToast(true); // уточнити необхідність появи цього тоста - при реєстрації нормально, при вході вже зареєстрованого user -?
      }
    } catch (error) {
      console.error('Error during signIn:', error);
    }

    reset({
      ...getValues,
      email: '',
      password: '',
    });

    toggleModal;
  };

  const signInInputs: Array<AuthInputs> = [
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
