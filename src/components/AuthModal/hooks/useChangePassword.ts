import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { ChangePasswordValues } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { handleRemoveFromLocalStorage } from 'helpers';
import { usePopUp } from 'hooks';
import { changePasswordDataInputs, changePasswordSchema } from '../assistants';

const useChangePassword = () => {
  const { changePassword } = useAuthRedux();
  const { showToast } = useNotificationContext();
  const { setIsScrollDisabled } = useScrollBodyContext();

  const { toggleModal } = usePopUp();

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

      const response = await changePassword({ newPassword });
      handleRemoveFromLocalStorage();

      showToast(response.meta.requestStatus);
    } catch (error) {
      console.error('Error during changing password', error);
      throw error;
    } finally {
      reset({
        ...getValues,
        newPassword: '',
        confirmPassword: '',
      });
      toggleModal();
      setIsScrollDisabled(false);
    }
  };

  return {
    changePasswordInputs: changePasswordDataInputs(errors),
    handleChangePasswordSubmit,
    registerChangePassword,
    changePasswordSubmitHandler,
  };
};

export default useChangePassword;
