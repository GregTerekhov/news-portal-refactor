import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuthRedux } from 'reduxStore/hooks';

import { AuthRequestWithoutName, UpdateCredentialsResponse } from 'types';

import { useNotification } from 'contexts';

import { renderEmailInputs, updateEmailSchema } from '../assistants';

const useUpdateEmail = () => {
  const { updateEmail } = useAuthRedux();
  const { setOpenToast } = useNotification();

  const {
    handleSubmit,
    register,
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
    const response = await updateEmail(data);
    const { message } = response.payload as UpdateCredentialsResponse;

    if (message && message === 'Email is successfully updated"') {
      setOpenToast(true);
    }
    reset({
      ...getValues,
      email: '',
      password: '',
    });
  };

  const emailInputs = renderEmailInputs({ email, password, errors });

  return {
    handleSubmit,
    register,
    errors,
    email,
    handleEmailSubmitHandler,
    emailInputs,
  };
};

export default useUpdateEmail;
