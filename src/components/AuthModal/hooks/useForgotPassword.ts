import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthRedux } from 'reduxStore/hooks';

import type { SendEmailRequest } from 'types';

import { changePasswordSchema, recoveryPasswordSchema } from '../assistants';
import { AuthInputs } from '../types';

interface RecoveryInputsValues {
  newPassword: string;
  confirmPassword: string;
}

const useForgotPassword = () => {
  const { sendEmailForRecovery, changePassword } = useAuthRedux();

  const {
    handleSubmit: handleRecoveryPasswordSubmit,
    register: registerRecovery,
    resetField,
    formState: { errors: recoveryPasswordErrors },
  } = useForm<SendEmailRequest>({ resolver: yupResolver(recoveryPasswordSchema) });

  const {
    handleSubmit: handleChangePasswordSubmit,
    register: registerChangePassword,
    reset,
    getValues,
    formState: { errors },
  } = useForm<RecoveryInputsValues>({
    resolver: yupResolver(changePasswordSchema),
  });

  const recoveryPasswordSubmitHandler: SubmitHandler<SendEmailRequest> = async (data, e) => {
    e?.stopPropagation();
    e?.preventDefault();

    await sendEmailForRecovery(data);
    resetField('email');
  };

  const changePasswordSubmitHandler: SubmitHandler<RecoveryInputsValues> = async (data) => {
    const { newPassword } = data; // обирання необхідного для відправки поля
    const dataToSend = { newPassword };

    await changePassword(dataToSend);

    reset({
      ...getValues,
      newPassword: '',
      confirmPassword: '',
    });
  };

  const changePasswordInputs: Array<AuthInputs> = [
    {
      type: 'password',
      placeholder: 'Enter your new password',
      children: 'New Password',
      errors: errors?.newPassword?.message,
      label: 'newPassword',
      ariaInvalid: errors?.newPassword ? true : false,
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

export default useForgotPassword;
