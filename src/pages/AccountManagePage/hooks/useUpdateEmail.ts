import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputLabel, type AuthRequestWithoutName } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import { handleRemoveFromLocalStorage } from 'helpers';
import { renderEmailInputs, updateEmailSchema } from '../assistants';

const useUpdateEmail = () => {
  const { requestStatus, updateEmail } = useAuthRedux();
  const { showToast } = useNotificationContext();

  const {
    handleSubmit: emailSubmit,
    register: updateEmailRegister,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AuthRequestWithoutName>({
    resolver: yupResolver(updateEmailSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // споглядання за відповідними полями
  const [email, password] = watch([InputLabel.Email, InputLabel.Password]);

  const handleEmailSubmitHandler: SubmitHandler<AuthRequestWithoutName> = async (data) => {
    try {
      await updateEmail(data);
      handleRemoveFromLocalStorage();

      requestStatus && showToast(requestStatus);
    } catch (error) {
      console.error('Error during updateEmail: ', error);
      throw error;
    } finally {
      reset({
        ...getValues,
        email: '',
        password: '',
      });
    }
  };

  return {
    emailSubmit,
    updateEmailRegister,
    errors,
    email,
    handleEmailSubmitHandler,
    emailInputs: renderEmailInputs({ email, password, errors }),
  };
};

export default useUpdateEmail;
