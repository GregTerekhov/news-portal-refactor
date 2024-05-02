import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import type { ExtendedUpdatePasswordRequest } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import { handleRemoveFromLocalStorage } from 'helpers';
import { renderPasswordInputs, updatePasswordSchema } from '../assistants';

const useUpdatePassword = () => {
  const { updatePassword } = useAuthRedux();
  const { showToast } = useNotificationContext();

  // хук useForm react-hook-form для updatePassword-операції
  const {
    handleSubmit: passwordSubmit,
    register: updatePasswordRegister,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ExtendedUpdatePasswordRequest>({
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      password: '',
    },
  });

  // споглядання за відповідними полями
  const [newPassword, confirmPassword, password] = watch([
    'newPassword',
    'confirmPassword',
    'password',
  ]);

  //Функція-submit
  const handlePasswordSubmitHandler: SubmitHandler<ExtendedUpdatePasswordRequest> = async (
    data,
  ) => {
    try {
      const { newPassword, password } = data;

      const response = await updatePassword({ password, newPassword });
      handleRemoveFromLocalStorage();

      showToast(response.meta.requestStatus);
    } catch (error) {
      console.error('Error during updatePassword:', error);
      throw error;
    } finally {
      reset({
        ...getValues,
        newPassword: '',
        confirmPassword: '',
        password: '',
      });
    }
  };

  return {
    passwordSubmit,
    updatePasswordRegister,
    handlePasswordSubmitHandler,
    passwordInputs: renderPasswordInputs({
      newPassword,
      confirmPassword,
      password,
      errors,
    }),
  };
};

export default useUpdatePassword;
