import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuthRedux } from 'reduxStore/hooks';

import { UpdateCredentialsResponse, IUpdatePassword } from 'types';

import { useNotification } from 'contexts';

import { renderPasswordInputs, updatePasswordSchema } from '../assistants';

const useUpdatePassword = () => {
  const { updatePassword } = useAuthRedux();
  const { setOpenToast } = useNotification();
  const {
    handleSubmit,
    register,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IUpdatePassword>({
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

  const handlePasswordSubmitHandler: SubmitHandler<IUpdatePassword> = async (data) => {
    const { newPassword, password } = data;
    const dataToSend = { password, newPassword };

    const response = await updatePassword(dataToSend);
    const { message } = response.payload as Omit<UpdateCredentialsResponse, 'newEmail'>;

    if (message && message === 'Password is successfully updated') {
      setOpenToast(true);
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
