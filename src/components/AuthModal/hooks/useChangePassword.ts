import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthRedux } from 'reduxStore/hooks';

import { ChangePasswordValues, AuthInputs } from 'types';
import { useNotification } from 'contexts';
import { usePopUp } from 'hooks';

import { changePasswordSchema } from '../assistants';
import { useNavigate } from 'react-router-dom';

const useChangePassword = () => {
  const { changePassword } = useAuthRedux();
  const { showToast } = useNotification();
  const { toggleModal } = usePopUp();
  const navigate = useNavigate();

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
      const { newPassword } = data;
      const dataToSend = { newPassword };

      const response = await changePassword(dataToSend);

      showToast(response.meta.requestStatus);

      if (response.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    } catch (error) {
      console.error('Error during changing password', error);
    } finally {
      reset({
        ...getValues,
        newPassword: '',
        confirmPassword: '',
      });
      toggleModal;
    }
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
