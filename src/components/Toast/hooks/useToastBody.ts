import { type ToastDescription, ToastStatus, type ToastTitle } from 'types';

import useToastError from './useToastError';
import useToastInfo from './useToastInfo';
import useToastSuccess from './useToastSuccess';

const useToastBody = () => {
  const { showSuccessToast } = useToastSuccess();
  const { showErrorToast } = useToastError();
  const { chooseInfoToastText } = useToastInfo();

  const { title: infoTitle, description: infoDescription } = chooseInfoToastText();
  const { title: successTitle, description: successDescription } = showSuccessToast();
  const { title: errorTitle, description: errorDescription } = showErrorToast();

  //Функція виведення заголовка тоста
  const getToastTitle = (status: ToastStatus): ToastTitle => {
    switch (status) {
      case ToastStatus.Success:
        return successTitle;
      case ToastStatus.Error:
        return errorTitle;
      default:
        return infoTitle;
    }
  };

  //Функція виведення опису тоста
  const getToastDescription = (status: ToastStatus): ToastDescription => {
    switch (status) {
      case ToastStatus.Success:
        return successDescription;
      case ToastStatus.Error:
        return errorDescription;
      default:
        return infoDescription;
    }
  };

  return { getToastTitle, getToastDescription };
};

export default useToastBody;
