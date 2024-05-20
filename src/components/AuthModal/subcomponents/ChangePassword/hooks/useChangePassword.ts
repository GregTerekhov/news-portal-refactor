import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { ChangePasswordValues } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { handleRemoveFromLocalStorage } from 'helpers';
import { usePopUp } from 'hooks';
import { getChangePasswordInputData, changePasswordSchema } from '../../assistants';

const useChangePassword = () => {
  const { requestStatus, changePassword } = useAuthRedux();
  const { setIsScrollDisabled } = useScrollBodyContext();
  const { showToast } = useNotificationContext();

  const { toggleModal } = usePopUp();

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

      await changePassword({ newPassword });
      handleRemoveFromLocalStorage();

      requestStatus && showToast(requestStatus);
    } catch (error) {
      console.error('Error during changePassword: ', error);
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
    changePasswordInputs: getChangePasswordInputData(errors),
    handleChangePasswordSubmit,
    registerChangePassword,
    changePasswordSubmitHandler,
  };
};

export default useChangePassword;
