import { useEffect, useId, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import type { AuthRequestWithoutName, EncryptedPasswordRequest } from 'types';

import { encryptPassword } from 'helpers';
import { useCrypto, usePopUp } from 'hooks';

import { signInDataInputs, signInSchema } from '../assistants';

const useSignIn = () => {
  const rememberMe = localStorage.getItem('rememberMe');
  const [isChecked, setIsChecked] = useState<boolean>(
    rememberMe && rememberMe === 'true' ? true : false,
  );

  const { login } = useAuthRedux();
  const { showToast } = useNotificationContext();
  const { setIsScrollDisabled } = useScrollBodyContext();

  const { toggleModal } = usePopUp();
  const { fetchCryptoPassword } = useCrypto();

  const savedUserId = localStorage.getItem('userId');

  // Отримання розшифрованого пароля та пошти, збережених раніше на бекенді та вставка їх в інпути авторизаційних даних
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

  // Видалення даних з localStorage при умові незаповненого чекбоксу Remember me
  useEffect(() => {
    if (!isChecked) {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('userId');
    }
  }, [isChecked]);

  // хук useForm react-hook-form для signIn-операції
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

  // Функція слідкування за станом чекбокса та його зміни
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isRememberMe = event.target.checked;
    setIsChecked(isRememberMe);
    localStorage.setItem('rememberMe', isRememberMe.toString());
  };

  // споглядання за відповідними полями, щоб зберігати введені валідні значення для RememberMe
  const [email, password] = watch(['email', 'password']);

  //Функція-submit
  const signInSubmitHandler: SubmitHandler<
    AuthRequestWithoutName | EncryptedPasswordRequest
  > = async (data, e) => {
    e?.preventDefault();
    try {
      if (isChecked && password !== '' && !savedUserId && !errors.password) {
        const { encryptionKey, encryptedPassword, salt } = await encryptPassword(password);
        const uniqueUserId = useId();

        console.log('uniqueUserId', uniqueUserId);
        localStorage.setItem('userId', uniqueUserId);

        const response = await login({
          email,
          password,
          cryptoData: { encryptionKey, encryptedPassword, salt, userId: uniqueUserId },
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

  // Data для signIn-інпутів
  const signInInputs = signInDataInputs(errors, email, password, isChecked);

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
