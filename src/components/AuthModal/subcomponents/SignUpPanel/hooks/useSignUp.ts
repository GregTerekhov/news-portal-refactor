import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { RequestStatus, type MainCredentials } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { usePopUp } from 'hooks';
import { getSignUpInputData, signUpSchema } from '../../assistants';

const useSignUp = () => {
  const { requestStatus, register, login } = useAuthRedux();
  const { showToast } = useNotificationContext();
  const { setIsScrollDisabled } = useScrollBodyContext();

  const { toggleModal } = usePopUp();

  const {
    handleSubmit,
    register: registration,
    reset,
    getValues,
    formState: { errors },
  } = useForm<MainCredentials>({ resolver: yupResolver(signUpSchema) });

  const signUpSubmitHandler: SubmitHandler<MainCredentials> = async (data) => {
    try {
      const { email, password } = data;

      await register(data);

      if (requestStatus === RequestStatus.Rejected) {
        showToast(requestStatus);
        toggleModal;
        setIsScrollDisabled(false);
        return;
      } else {
        await login({ email, password });

        requestStatus && showToast(requestStatus);
      }
    } catch (error) {
      console.error('Error during signUp: ', error);
      throw error;
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
    signUpInputs: getSignUpInputData(errors),
  };
};

export default useSignUp;
