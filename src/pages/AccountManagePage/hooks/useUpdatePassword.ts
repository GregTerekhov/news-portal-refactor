import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuthRedux } from 'reduxStore/hooks';

import { ExtendedUpdatePasswordRequest } from 'types';

import { useNotification } from 'contexts';

import { renderPasswordInputs, updatePasswordSchema } from '../assistants';

const useUpdatePassword = () => {
  const { updatePassword } = useAuthRedux();
  const { showToast } = useNotification();
  const {
    handleSubmit,
    register,
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
    }
    reset({
      ...getValues,
      newPassword: '',
      confirmPassword: '',
      password: '',
    });
  };

  const passwordInputs = renderPasswordInputs({
    newPassword,
    confirmPassword,
    password,
    errors,
  });

  return {
    handleSubmit,
    register,
    handlePasswordSubmitHandler,
    passwordInputs,
  };
};

export default useUpdatePassword;
