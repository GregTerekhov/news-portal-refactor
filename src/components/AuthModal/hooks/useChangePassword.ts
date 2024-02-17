import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthRedux } from 'reduxStore/hooks';

import { ChangePasswordValues, AuthInputs } from 'types';
import { useNotification } from 'contexts';

import { changePasswordSchema } from '../assistants';

const useChangePassword = () => {
  const { changePassword } = useAuthRedux();
  const { showToast } = useNotification();

  const {
    handleSubmit: handleChangePasswordSubmit,
    register: registerChangePassword,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordValues>({
    resolver: yupResolver(changePasswordSchema),
  });

  const changePasswordSubmitHandler: SubmitHandler<ChangePasswordValues> = async (data) => {
    try {
      const { newPassword } = data; // обирання необхідного для відправки поля
      const dataToSend = { newPassword };

      const response = await changePassword(dataToSend);

      showToast(response.meta.requestStatus);
    } catch (error) {
      console.error('Error during changing password', error);
    }

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
      autoFocus: true,
    },
    {
      type: 'password',
      placeholder: 'Confirm your password',
      children: 'Confirm Password',
      errors: errors?.confirmPassword?.message,
      label: 'confirmPassword',
      ariaInvalid: errors?.confirmPassword ? true : false,
      autoFocus: false,
    },
  ];

  return {
    changePasswordInputs,
    handleChangePasswordSubmit,
    registerChangePassword,
    changePasswordSubmitHandler,
  };
};

export default useChangePassword;
