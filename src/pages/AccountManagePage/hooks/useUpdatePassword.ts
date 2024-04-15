import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import type { ExtendedUpdatePasswordRequest } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

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
      const dataToSend = { password, newPassword };

      const response = await updatePassword(dataToSend);
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('userId');

      showToast(response.meta.requestStatus);
    } catch (error) {
      console.error('Error during updatePassword:', error);
    } finally {
      reset({
        ...getValues,
        newPassword: '',
        confirmPassword: '',
        password: '',
      });
    }
  };

  // Data для updatePassword-інпутів
  const passwordInputs = renderPasswordInputs({
    newPassword,
    confirmPassword,
    password,
    errors,
  });

  return {
    passwordSubmit,
    updatePasswordRegister,
    handlePasswordSubmitHandler,
    passwordInputs,
  };
};

export default useUpdatePassword;
