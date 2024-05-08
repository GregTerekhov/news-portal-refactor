import type { ToastDescription, ToastStatus, ToastTitle } from 'types';

import { useActiveLinks } from 'hooks';
import useToastError from './useToastError';
import useToastInfo from './useToastInfo';
import useToastSuccess from './useToastSuccess';

const useToastBody = () => {
  const { showSuccessToast } = useToastSuccess();
  const { showErrorToast } = useToastError();
  const { chooseInfoToastText } = useToastInfo();

  const activeLinks = useActiveLinks();
  const { title: infoTitle, description: infoDescription } = chooseInfoToastText(activeLinks);
  const { title: successTitle, description: successDescription } = showSuccessToast();
  const { title: errorTitle, description: errorDescription } = showErrorToast();

  //Функція виведення заголовка тоста
  const getToastTitle = (status: ToastStatus): ToastTitle => {
    switch (status) {
      case 'success':
        return successTitle;
      case 'error':
        return errorTitle;
      default:
        return infoTitle;
    }
  };

  //Функція виведення опису тоста
  const getToastDescription = (status: ToastStatus): ToastDescription => {
    switch (status) {
      case 'success':
        return successDescription;
      case 'error':
        return errorDescription;
      default:
        return infoDescription;
    }
  };

  return { getToastTitle, getToastDescription };
};

export default useToastBody;
