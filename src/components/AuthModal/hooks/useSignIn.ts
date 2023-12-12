import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SignInRequiredFields } from 'types';

import { useAuthCollector, usePopUp } from 'hooks';

import { decryptData, encryptData, generateEncryptionKey, signInSchema } from '../assistants';

const useSignIn = () => {
  const [isChecked, setIsChecked] = useState<boolean>(() => !!localStorage.rememberMe);
  const [isKeyReady, setIsKeyReady] = useState<boolean>(false);
  const [key, setKey] = useState<CryptoKey | null>(null);

  const { login } = useAuthCollector();
  const { toggleModal } = usePopUp();

  useEffect(() => {
    const generateKey = async () => {
      try {
        const generatedKey = await generateEncryptionKey();
        setKey(generatedKey);
        setIsKeyReady(true);
      } catch (error) {
        console.error('Error generating key:', error);
      }
    };

    generateKey();
  }, []);

  useEffect(() => {
    const fetchRememberedData = async () => {
      const encryptedData = localStorage.getItem('rememberedUserData');
      console.log('isKeyReady', isKeyReady);

      if (encryptedData && isKeyReady && key) {
        const decryptedData = await decryptData(encryptedData, key);
        console.log('decryptedData', decryptedData);
        setValue('email', decryptedData.email);
        setValue('password', decryptedData.password);
      }
    };

    fetchRememberedData();
  }, [isKeyReady]);

  const {
    handleSubmit,
    register: registration,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SignInRequiredFields>({
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

  const signInSubmitHandler: SubmitHandler<SignInRequiredFields> = async (data, e) => {
    e?.preventDefault();
    const { email, password } = data;

    if (isChecked && email !== '' && key) {
      const userData = { email: email, password: password };
      const encryptedData = await encryptData(userData, key);
      localStorage.setItem('rememberedUserData', encryptedData);
      localStorage.rememberMe = isChecked.toString();
    }

    if (!isChecked) {
      localStorage.removeItem('rememberedUserData');
      localStorage.removeItem('rememberMe');
    }

    const signInCredentials = {
      email,
      password,
    };

    const response = await login(signInCredentials);

    if (response.payload === 'User is not authentified') {
      console.log('Email or password are wrong'); // додати тост
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
