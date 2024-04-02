import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import type { ChangePasswordValues } from 'types';
import { usePopUp } from 'hooks';

import { changePasswordDataInputs, changePasswordSchema } from '../assistants';
import { useNavigate } from 'react-router-dom';

const useChangePassword = () => {
  const { changePassword } = useAuthRedux();
  const { showToast } = useNotificationContext();
  const { setIsScrollDisabled } = useScrollBodyContext();

  const { toggleModal } = usePopUp();

  const navigate = useNavigate();

  // хук useForm react-hook-form для changePassword-операції
  const {
    handleSubmit: handleChangePasswordSubmit,
    register: registerChangePassword,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordValues>({
    resolver: yupResolver(changePasswordSchema),
  });

  //Функція-submit
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
      setIsScrollDisabled(false);
    }
  };

  // Data для changePassword-інпутів
  const changePasswordInputs = changePasswordDataInputs(errors);

  return {
    changePasswordInputs,
    handleChangePasswordSubmit,
    registerChangePassword,
    changePasswordSubmitHandler,
  };
};

export default useChangePassword;
