import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotification } from 'contexts';

import type { ExtendedUpdatePasswordRequest } from 'types';

import { renderPasswordInputs, updatePasswordSchema } from '../assistants';

const useUpdatePassword = () => {
  const { updatePassword } = useAuthRedux();
  const { showToast } = useNotification();
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

  const [newPassword, confirmPassword, password] = watch([
    'newPassword',
    'confirmPassword',
    'password',
  ]);

  const handlePasswordSubmitHandler: SubmitHandler<ExtendedUpdatePasswordRequest> = async (
    data,
  ) => {
    try {
      const { newPassword, password } = data;
      const dataToSend = { password, newPassword };

      const response = await updatePassword(dataToSend);

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
