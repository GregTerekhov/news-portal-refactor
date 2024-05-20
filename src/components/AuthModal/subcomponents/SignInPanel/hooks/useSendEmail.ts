import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { InputLabel, type SendEmailRequest } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { usePopUp } from 'hooks';
import { recoveryPasswordSchema } from '../../assistants';

const useSendEmail = () => {
  const { requestStatus, sendEmailForRecovery } = useAuthRedux();
  const { setIsScrollDisabled } = useScrollBodyContext();
  const { showToast } = useNotificationContext();

  const { toggleModal } = usePopUp();

  const {
    handleSubmit: handleRecoveryPasswordSubmit,
    register: registerRecovery,
    resetField,
    formState: { errors: recoveryPasswordErrors },
  } = useForm<SendEmailRequest>({ resolver: yupResolver(recoveryPasswordSchema) });

  const recoveryPasswordSubmitHandler: SubmitHandler<SendEmailRequest> = async (data, e) => {
    e?.stopPropagation();
    e?.preventDefault();

    try {
      await sendEmailForRecovery(data);

      requestStatus && showToast(requestStatus);
    } catch (error) {
      console.error('Error during sending email for recovery password: ', error);
      throw error;
    } finally {
      resetField(InputLabel.Email);
      toggleModal();
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
