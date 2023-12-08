import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { UpdatePasswordRequiredToValidate } from 'types';

import { useAuthCollector } from 'hooks';

import { renderPasswordInputs, updatePasswordSchema } from '../assistants';

const useUpdatePassword = () => {
  const { updatePassword } = useAuthCollector();
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

    await updatePassword(dataToSend);
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
