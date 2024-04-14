import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { SendEmailRequest } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { recoveryPasswordSchema } from '../assistants';

const useSendEmail = () => {
  const { sendEmailForRecovery } = useAuthRedux();
  const { showToast } = useNotificationContext();
  const { setIsScrollDisabled } = useScrollBodyContext();

  // хук useForm react-hook-form для sendEmailForRecovery-операції
  const {
    handleSubmit: handleRecoveryPasswordSubmit,
    register: registerRecovery,
    resetField,
    formState: { errors: recoveryPasswordErrors },
  } = useForm<SendEmailRequest>({ resolver: yupResolver(recoveryPasswordSchema) });

  //Функція-submit
  const recoveryPasswordSubmitHandler: SubmitHandler<SendEmailRequest> = async (data, e) => {
    e?.stopPropagation();
    e?.preventDefault();

    try {
      const response = await sendEmailForRecovery(data);

      showToast(response.meta.requestStatus);
    } catch (error) {
      console.error('Error during sending email for recovery password', error);
    } finally {
      resetField('email');
      setIsScrollDisabled(false);
    }
  };

  return {
    recoveryPasswordErrors,
    registerRecovery,
    handleRecoveryPasswordSubmit,
    recoveryPasswordSubmitHandler,
  };
};

export default useSendEmail;
