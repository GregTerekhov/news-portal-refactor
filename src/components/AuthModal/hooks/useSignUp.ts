import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { MainCredentials } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { usePopUp } from 'hooks';
import { signUpDataInputs, signUpSchema } from '../assistants';

const useSignUp = () => {
  const { register, login } = useAuthRedux();
  const { showToast } = useNotificationContext();
  const { setIsScrollDisabled } = useScrollBodyContext();

  const { toggleModal } = usePopUp();

  // хук useForm react-hook-form для signUp-операції
  const {
    handleSubmit,
    register: registration,
    reset,
    getValues,
    formState: { errors },
  } = useForm<MainCredentials>({ resolver: yupResolver(signUpSchema) });

  //Функція-submit
  const signUpSubmitHandler: SubmitHandler<MainCredentials> = async (data) => {
    try {
      const { name, email, password } = data;

      const signUpResponse = await register({ name, email, password });

      if (signUpResponse.meta.requestStatus === 'rejected') {
        showToast(signUpResponse.meta.requestStatus);
        toggleModal;
        setIsScrollDisabled(false);
        return;
      } else {
        const response = await login({ email, password });

        showToast(response.meta.requestStatus);
      }
    } catch (error) {
      console.error('Error during signUp:', error);
    } finally {
      reset({
        ...getValues,
        name: '',
        email: '',
        password: '',
      });
      toggleModal();
      setIsScrollDisabled(false);
    }
  };

  return {
    handleSubmit,
    registration,
    signUpSubmitHandler,
    signUpInputs: signUpDataInputs(errors),
  };
};

export default useSignUp;
