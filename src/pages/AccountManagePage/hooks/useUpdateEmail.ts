import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotification } from 'contexts';

import type { AuthRequestWithoutName } from 'types';

import { renderEmailInputs, updateEmailSchema } from '../assistants';

const useUpdateEmail = () => {
  const { updateEmail } = useAuthRedux();
  const { showToast } = useNotification();

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

  const [email, password] = watch(['email', 'password']);

  const handleEmailSubmitHandler: SubmitHandler<AuthRequestWithoutName> = async (data) => {
    try {
      const response = await updateEmail(data);

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

  const emailInputs = renderEmailInputs({ email, password, errors });

  return {
    emailSubmit,
    updateEmailRegister,
    errors,
    email,
    handleEmailSubmitHandler,
    emailInputs,
  };
};

export default useUpdateEmail;
