import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { UpdateCredentialsResponse, UpdatePasswordRequiredToValidate } from 'types';

import { useNotification } from 'contexts';
import { useAuthCollector } from 'hooks';

import { renderPasswordInputs, updatePasswordSchema } from '../assistants';

const useUpdatePassword = () => {
  const { updatePassword } = useAuthCollector();
  const { setOpenToast } = useNotification();
  const {
    handleSubmit,
    register,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<UpdatePasswordRequiredToValidate>({
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      oldPassword: '',
    },
  });

  const [newPassword, confirmPassword, oldPassword] = watch([
    'newPassword',
    'confirmPassword',
    'oldPassword',
  ]);

  const handlePasswordSubmitHandler: SubmitHandler<UpdatePasswordRequiredToValidate> = async (
    data,
  ) => {
    const { newPassword, oldPassword } = data;
    const dataToSend = { newPassword, oldPassword };

    const response = await updatePassword(dataToSend);
    const { message } = response.payload as Omit<UpdateCredentialsResponse, 'newEmail'>;

    if (message && message === 'Password is successfully updated') {
      setOpenToast(true);
    }
    reset({
      ...getValues,
      newPassword: '',
      confirmPassword: '',
      oldPassword: '',
    });
  };

  const passwordInputs = renderPasswordInputs({
    newPassword,
    confirmPassword,
    oldPassword,
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
