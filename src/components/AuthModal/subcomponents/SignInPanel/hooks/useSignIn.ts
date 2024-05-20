import { useEffect, useId, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { InputLabel, type AuthRequestWithoutName, type EncryptedPasswordRequest } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import {
  encryptPassword,
  handleRemoveFromLocalStorage,
  localStorageOperation,
  OperationType,
} from 'helpers';
import { useCrypto, usePopUp } from 'hooks';
import { changeStateIsChecked, getSignInInputData, signInSchema } from '../../assistants';

const useSignIn = () => {
  const rememberMe = localStorageOperation(OperationType.Get, 'rememberMe');

  const [isChecked, setIsChecked] = useState(rememberMe === 'true' ? true : false);
  const [cryptoDataFetched, setCryptoDataFetched] = useState(false);

  const { requestStatus, login } = useAuthRedux();
  const { showToast } = useNotificationContext();
  const { setIsScrollDisabled } = useScrollBodyContext();

  const { toggleModal } = usePopUp();
  const { retrieveDecryptedData } = useCrypto();

  const uniqueUserId = useId();
  const savedUserId = localStorageOperation(OperationType.Get, 'userId');

  const {
    handleSubmit,
    register: registration,
    reset,
    watch,
    setValue,
    getValues,
    trigger,
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
        const decryptedData = await retrieveDecryptedData();

        if (decryptedData && decryptedData.savedPassword) {
          setValue(InputLabel.Email, decryptedData.email);
          setValue(InputLabel.Password, decryptedData.savedPassword);
        }

        setCryptoDataFetched(true);
      };

      fetchPassword();
    }
  }, [retrieveDecryptedData, setValue]);

  // Видалення даних з localStorage при умові незаповненого чекбоксу Remember me
  useEffect(() => {
    if (!isChecked) {
      handleRemoveFromLocalStorage();
    }
  }, [isChecked]);

  // споглядання за відповідними полями, щоб зберігати введені валідні значення для RememberMe
  const [email, password] = watch([InputLabel.Email, InputLabel.Password]);

  const validateFields = async (): Promise<boolean> => {
    const hasNotError = await trigger([InputLabel.Email, InputLabel.Password]);

    if (!hasNotError) {
      return false;
    }

    return hasNotError;
  };

  // Функція слідкування за станом чекбокса та його зміни
  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const isRememberMe = changeStateIsChecked(event, isChecked);

    await validateFields();

    setIsChecked(isRememberMe);
    localStorageOperation(OperationType.Set, 'rememberMe', isRememberMe.toString());
  };

  const shouldEncryptPassword = isChecked && password !== '' && !savedUserId && !errors.password;
  const shouldSendSimpleCredentials = !isChecked || (isChecked && !!savedUserId);

  const signInSubmitHandler: SubmitHandler<
    AuthRequestWithoutName | EncryptedPasswordRequest
  > = async (data, e) => {
    e?.preventDefault();
    try {
      const { email, password } = data;

      if (shouldEncryptPassword) {
        const { exportedCryptoKey, encryptedPassword, salt } = await encryptPassword(password);
        localStorageOperation(OperationType.Set, 'userId', uniqueUserId);

        await login({
          email,
          password,
          cryptoData: { exportedCryptoKey, encryptedPassword, salt, userId: uniqueUserId },
        });

        requestStatus && showToast(requestStatus);
      } else if (shouldSendSimpleCredentials) {
        await login(data);

        requestStatus && showToast(requestStatus);
      }
    } catch (error) {
      console.error('Error during signIn: ', error);
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
    signInInputs: getSignInInputData(errors, email, password, isChecked),
    handleSubmit,
    registration,
    handleCheckboxChange,
    signInSubmitHandler,
  };
};

export default useSignIn;
