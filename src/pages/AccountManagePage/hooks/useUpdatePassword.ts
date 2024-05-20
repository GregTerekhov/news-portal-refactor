import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputLabel, type ExtendedUpdatePassword } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import { handleRemoveFromLocalStorage } from 'helpers';
import { renderPasswordInputs, updatePasswordSchema } from '../assistants';

const useUpdatePassword = () => {
  const { requestStatus, updatePassword } = useAuthRedux();
  const { showToast } = useNotificationContext();

  const {
    handleSubmit: passwordSubmit,
    register: updatePasswordRegister,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ExtendedUpdatePassword>({
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      password: '',
    },
  });

  // споглядання за відповідними полями
  const [newPassword, confirmPassword, password] = watch([
    InputLabel.NewPassword,
    InputLabel.ConfirmPassword,
    InputLabel.Password,
  ]);

  const handlePasswordSubmitHandler: SubmitHandler<ExtendedUpdatePassword> = async (data) => {
    try {
      const { newPassword, password } = data;

      await updatePassword({ password, newPassword });
      handleRemoveFromLocalStorage();

      requestStatus && showToast(requestStatus);
    } catch (error) {
      console.error('Error during updatePassword: ', error);
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
