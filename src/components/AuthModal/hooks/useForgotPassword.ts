import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { RecoveryPasswordChangeRequiredToValidate, RecoveryPasswordRequestRequired } from 'types';

import { useAuthCollector } from 'hooks';

import { changePasswordSchema, recoveryPasswordSchema } from '../assistants';

const useSignIn = () => {
  const { changePassword } = useAuthCollector();

  const {
    handleSubmit: handleRecoveryPasswordSubmit,
    register: registerRecovery,
    resetField,
    formState: { errors: recoveryPasswordErrors },
  } = useForm<RecoveryPasswordRequestRequired>({ resolver: yupResolver(recoveryPasswordSchema) });

  const {
    handleSubmit: handleChangePasswordSubmit,
    register: registerChangePassword,
    reset,
    getValues,
    formState: { errors },
  } = useForm<RecoveryPasswordChangeRequiredToValidate>({
    resolver: yupResolver(changePasswordSchema),
  });

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
    const { changedPassword } = data; // обирання необхідного для відправки поля
    const dataToSend = { changedPassword };

    await changePassword(dataToSend);
    reset({
      ...getValues,
      changedPassword: '',
      confirmPassword: '',
    });
  };

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
    recoveryPasswordErrors,
    registerRecovery,
    handleRecoveryPasswordSubmit,
    recoveryPasswordSubmitHandler,
    changePasswordInputs,
    handleChangePasswordSubmit,
    registerChangePassword,
    changePasswordSubmitHandler,
  };
};

export default useSignIn;
