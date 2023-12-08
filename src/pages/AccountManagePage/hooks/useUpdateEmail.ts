import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IUpdateEmail } from 'types';

import { useAuthCollector } from 'hooks';

import { renderEmailInputs, updateEmailSchema } from '../assistants';

const useUpdateEmail = () => {
  const { updateEmail } = useAuthCollector();

  const {
    handleSubmit,
    register,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IUpdateEmail>({
    resolver: yupResolver(updateEmailSchema),
    defaultValues: {
      updatedEmail: '',
      currentPassword: '',
    },
  });

  const [updatedEmail, currentPassword] = watch(['updatedEmail', 'currentPassword']);

  const handleEmailSubmitHandler: SubmitHandler<IUpdateEmail> = async (data) => {
    await updateEmail(data);
    reset({
      ...getValues,
      updatedEmail: '',
      currentPassword: '',
    });
  };

  const emailInputs = renderEmailInputs({ updatedEmail, currentPassword, errors });

  return {
    handleSubmit,
    register,
    errors,
    updatedEmail,
    handleEmailSubmitHandler,
    emailInputs,
  };
};

export default useUpdateEmail;
