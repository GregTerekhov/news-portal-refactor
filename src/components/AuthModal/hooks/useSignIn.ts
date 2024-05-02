import { useEffect, useId, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { AuthRequestWithoutName, EncryptedPasswordRequest } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { encryptPassword, handleRemoveFromLocalStorage, localStorageOperation } from 'helpers';
import { useCrypto, usePopUp } from 'hooks';
import { signInDataInputs, signInSchema } from '../assistants';

const useSignIn = () => {
  const rememberMe = localStorageOperation('get', 'rememberMe');

  const [isChecked, setIsChecked] = useState<boolean>(
    rememberMe && rememberMe === 'true' ? true : false,
  );
  const [cryptoDataFetched, setCryptoDataFetched] = useState(false);

  const { login } = useAuthRedux();
  const { showToast } = useNotificationContext();
  const { setIsScrollDisabled } = useScrollBodyContext();

  const { toggleModal } = usePopUp();
  const { fetchCryptoPassword } = useCrypto();

  const uniqueUserId = useId();
  const savedUserId = localStorageOperation('get', 'userId');

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

  // Отримання розшифрованого пароля та пошти, збережених раніше на бекенді та вставка їх в інпути авторизаційних даних
  useEffect(() => {
    if (!cryptoDataFetched) {
      const fetchPassword = async () => {
        const cryptoData = await fetchCryptoPassword();

        if (cryptoData && cryptoData.savedPassword) {
          setValue('email', cryptoData.email);
          setValue('password', cryptoData.savedPassword);
        }

        setCryptoDataFetched(true);
      };

      fetchPassword();
    }
  }, [fetchCryptoPassword, setValue]);

  // Видалення даних з localStorage при умові незаповненого чекбоксу Remember me
  useEffect(() => {
    if (!isChecked) {
      handleRemoveFromLocalStorage();
    }
  }, [isChecked]);

  // Функція слідкування за станом чекбокса та його зміни
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isRememberMe = event.target.checked;

    setIsChecked(isRememberMe);
    localStorageOperation('set', 'rememberMe', isRememberMe.toString());
  };

  // споглядання за відповідними полями, щоб зберігати введені валідні значення для RememberMe
  const [email, password] = watch(['email', 'password']);

  const shouldEncryptPassword = isChecked && password !== '' && !savedUserId && !errors.password;
  const shouldSendSimpleCredentials = !isChecked || (isChecked && !!savedUserId);

  //Функція-submit
  const signInSubmitHandler: SubmitHandler<
    AuthRequestWithoutName | EncryptedPasswordRequest
  > = async (data, e) => {
    e?.preventDefault();
    try {
      const { email, password } = data;

      if (shouldEncryptPassword) {
        const { exportedCryptoKey, encryptedPassword, salt } = await encryptPassword(password);
        localStorageOperation('set', 'userId', uniqueUserId);

        const response = await login({
          email,
          password,
          cryptoData: { exportedCryptoKey, encryptedPassword, salt, userId: uniqueUserId },
        });

        showToast(response.meta.requestStatus);
      } else if (shouldSendSimpleCredentials) {
        const response = await login(data);

        showToast(response.meta.requestStatus);
      }
    } catch (error) {
      console.error('Error during signIn:', error);
      throw error;
    } finally {
      reset({
        ...getValues,
        email: '',
        password: '',
      });

      toggleModal();
      setIsScrollDisabled(false);
    }
  };

  return {
    isChecked,
    signInInputs: signInDataInputs(errors, email, password, isChecked),
    handleSubmit,
    registration,
    handleCheckboxChange,
    signInSubmitHandler,
  };
};

export default useSignIn;
