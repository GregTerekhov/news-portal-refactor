import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotification, useScrollBodyContext } from 'contexts';

import { AuthRequestWithoutName, AuthInputs } from 'types';
import { usePopUp } from 'hooks';

import {
  getCheckboxState,
  loadUserDataFromLocalStorage,
  saveUserDataToLocalStorage,
  signInSchema,
} from '../assistants';

const useSignIn = () => {
  const [isChecked, setIsChecked] = useState<boolean>(getCheckboxState());

  const { showToast } = useNotification();
  const { setIsScrollDisabled } = useScrollBodyContext();
  const { login } = useAuthRedux();
  const { toggleModal } = usePopUp();

  useEffect(() => {
    const hasSavedCryptoUserData = localStorage.getItem('rememberMeData');

    const loadUserData = async (): Promise<void> => {
      if (hasSavedCryptoUserData) {
        const loadedUserData = await loadUserDataFromLocalStorage();

        if (loadedUserData) {
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

      const response = await login(data);

      showToast(response.meta.requestStatus);
    } catch (error) {
      console.error('Error during signIn:', error);
    } finally {
      reset({
        ...getValues,
        email: '',
        password: '',
      });

      toggleModal;
      setIsScrollDisabled(false);
    }
  };

  const signInInputs: Array<AuthInputs> = [
    {
      type: 'email',
      placeholder: 'Enter your email',
      labelName: 'Email',
      fieldValue: email,
      errors: errors?.email?.message,
      label: 'email',
      ariaInvalid: errors?.email ? true : false,
      autoFocus: true,
      autofill: 'email',
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      labelName: 'Password',
      fieldValue: password,
      errors: errors?.password?.message,
      label: 'password',
      ariaInvalid: errors?.password ? true : false,
      autoFocus: false,
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
