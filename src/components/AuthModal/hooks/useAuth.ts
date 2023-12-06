import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  SignInRequiredFields,
  SignUpRequiredFields,
  RecoveryPasswordRequestRequired,
  RecoveryPasswordChangeRequiredToValidate,
} from 'types';
import { useAuthCollector, usePopUp } from 'hooks';

import {
  signUpSchema,
  signInSchema,
  recoveryPasswordSchema,
  changePasswordSchema,
} from '../assistants';

const useAuth = () => {
  const [isChecked, setIsChecked] = useState<boolean>(() => !!localStorage.rememberMe);
  const { toggleModal } = usePopUp();
  const { register, login, changePassword } = useAuthCollector();

  const {
    handleSubmit: handleSignUpSubmit,
    register: registerSignUp,
    reset: resetSignUpValues,
    getValues: getSignUpCredentials,
    formState: { errors: signUpErrors },
  } = useForm<SignUpRequiredFields>({ resolver: yupResolver(signUpSchema) });

  const {
    handleSubmit: handleSignInSubmit,
    register: registerSignIn,
    reset: resetSignInValues,
    watch,
    getValues: getSignInCredentials,
    formState: { errors: signInErrors },
  } = useForm<SignInRequiredFields>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: localStorage.rememberMe ? localStorage.userEmail : '',
      password: localStorage.rememberMe ? localStorage.userPassword : '',
    },
  });

  const {
    handleSubmit: handleRecoveryPasswordSubmit,
    register: registerRecovery,
    resetField,
    formState: { errors: recoveryPasswordErrors },
  } = useForm<RecoveryPasswordRequestRequired>({ resolver: yupResolver(recoveryPasswordSchema) });

  const {
    handleSubmit: handleChangePasswordSubmit,
    register: registerChangePassword,
    reset: resetChangePasswordValues,
    getValues: getRecoveryChangeValues,
    formState: { errors },
  } = useForm<RecoveryPasswordChangeRequiredToValidate>({
    resolver: yupResolver(changePasswordSchema),
  });

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
    resetSignUpValues({
      ...getSignUpCredentials,
      name: '',
      email: '',
      password: '',
    });
    toggleModal();
  };

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
    resetSignInValues({
      ...getSignInCredentials,
      email: '',
      password: '',
    });

    toggleModal();
  };

  const recoveryPasswordSubmitHandler: SubmitHandler<RecoveryPasswordRequestRequired> = async (
    data,
    e,
  ) => {
    e?.stopPropagation();
    e?.preventDefault();
    console.log('Recovery email', data);
    resetField('recoveryEmail');
  };

  const changePasswordSubmitHandler: SubmitHandler<
    RecoveryPasswordChangeRequiredToValidate
  > = async (data) => {
    const { changedPassword } = data;
    const dataToSend = { changedPassword };

    await changePassword(dataToSend);
    resetChangePasswordValues({
      ...getRecoveryChangeValues,
      changedPassword: '',
      confirmPassword: '',
    });
  };

  const signUpInputs = [
    {
      type: 'text',
      placeholder: 'Enter your name',
      children: 'Name',
      errors: signUpErrors?.name?.message,
      label: 'name',
      ariaInvalid: signUpErrors?.name ? true : false,
    },
    {
      type: 'email',
      placeholder: 'Enter your email',
      children: 'Email',
      errors: signUpErrors?.email?.message,
      label: 'email',
      ariaInvalid: signUpErrors?.email ? true : false,
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      children: 'Password',
      errors: signUpErrors?.password?.message,
      label: 'password',
      ariaInvalid: signUpErrors?.password ? true : false,
    },
  ];

  const signInInputs = [
    {
      type: 'email',
      placeholder: 'Enter your email',
      children: 'Email',
      fieldValue: email,
      errors: signInErrors?.email?.message,
      label: 'email',
      ariaInvalid: signInErrors?.email ? true : false,
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      children: 'Password',
      fieldValue: password,
      errors: signInErrors?.password?.message,
      label: 'password',
      ariaInvalid: signInErrors?.password ? true : false,
    },
  ];

  const changePasswordInputs = [
    {
      type: 'password',
      placeholder: 'Enter your new password',
      children: 'New Password',
      errors: errors?.changedPassword?.message,
      label: 'changedPassword',
      ariaInvalid: errors?.changedPassword ? true : false,
    },
    {
      type: 'password',
      placeholder: 'Confirm your password',
      children: 'Confirm Password',
      errors: errors?.confirmPassword?.message,
      label: 'confirmPassword',
      ariaInvalid: errors?.confirmPassword ? true : false,
    },
  ];

  return {
    isChecked,
    handleCheckboxChange,
    handleSignUpSubmit,
    handleSignInSubmit,
    handleRecoveryPasswordSubmit,
    handleChangePasswordSubmit,
    registerSignUp,
    registerSignIn,
    registerRecovery,
    registerChangePassword,
    signUpSubmitHandler,
    signInSubmitHandler,
    recoveryPasswordSubmitHandler,
    changePasswordSubmitHandler,
    recoveryPasswordErrors,
    signUpInputs,
    signInInputs,
    changePasswordInputs,
  };
};

export default useAuth;
