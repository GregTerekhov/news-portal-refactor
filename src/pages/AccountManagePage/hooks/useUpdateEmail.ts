import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import type { AuthRequestWithoutName } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import { renderEmailInputs, updateEmailSchema } from '../assistants';

const useUpdateEmail = () => {
  const { updateEmail } = useAuthRedux();
  const { showToast } = useNotificationContext();

  // хук useForm react-hook-form для updateEmail-операції
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
  const [email, password] = watch(['email', 'password']);

  //Функція-submit
  const handleEmailSubmitHandler: SubmitHandler<AuthRequestWithoutName> = async (data) => {
    try {
      const response = await updateEmail(data);
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('userId');

      showToast(response.meta.requestStatus);
    } catch (error) {
      console.error('Error during updateEmail:', error);
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
