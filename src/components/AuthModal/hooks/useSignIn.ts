import { useEffect, useId, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotification, useScrollBodyContext } from 'contexts';

import type { AuthRequestWithoutName, AuthInputs, EncryptedPasswordRequest } from 'types';
import { encryptPassword } from 'helpers';
import { useCrypto, usePopUp } from 'hooks';

import { getCheckboxState, signInSchema } from '../assistants';

const useSignIn = () => {
  const [isChecked, setIsChecked] = useState<boolean>(getCheckboxState());

  const { showToast } = useNotification();
  const { setIsScrollDisabled } = useScrollBodyContext();
  const { login } = useAuthRedux();
  const { toggleModal } = usePopUp();
  const { fetchCryptoPassword } = useCrypto();

  const savedUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPassword = async () => {
      const cryptoData = await fetchCryptoPassword();

      if (cryptoData && cryptoData.savedPassword) {
        setValue('email', cryptoData.email);
        setValue('password', cryptoData.savedPassword);
      }
    };

    fetchPassword();
  }, []);

  useEffect(() => {
    if (!isChecked) {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('userId');
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

  const signInSubmitHandler: SubmitHandler<
    AuthRequestWithoutName | EncryptedPasswordRequest
  > = async (data, e) => {
    e?.preventDefault();
    try {
      if (isChecked && password !== '' && !savedUserId && !errors.password) {
        const { encryptedPassword, salt } = await encryptPassword(password);
        const uniqueUserId = useId();

        console.log('uniqueUserId', uniqueUserId);
        localStorage.setItem('userId', uniqueUserId);
        localStorage.setItem('rememberMe', isChecked.toString());

        const response = await login({
          email,
          password,
          cryptoData: { encryptedPassword, salt, userId: uniqueUserId },
        });

        showToast(response.meta.requestStatus);
      } else if (!isChecked) {
        const response = await login(data);

        showToast(response.meta.requestStatus);
      }
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
      disabled: isChecked ? true : false,
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      labelName: 'Password',
      fieldValue: typeof password === 'string' ? password : '',
      errors: errors?.password?.message,
      label: 'password',
      ariaInvalid: errors?.password ? true : false,
      autoFocus: false,
      disabled: isChecked ? true : false,
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
