import type { ToastStatus } from 'types';

import { useActiveLinks } from 'hooks';
import useToastError from './useToastError';
import useToastInfo from './useToastInfo';
import useToastSuccess from './useToastSuccess';

const useToastBody = () => {
  const { showSuccessToast } = useToastSuccess();
  const { showErrorToast } = useToastError();
  const { chooseInfoToastText } = useToastInfo();

  const activeLinks = useActiveLinks();
  const showInfoToast = chooseInfoToastText(activeLinks);

  //Функція виведення заголовка тоста
  const getToastTitle = (status: ToastStatus): string => {
    switch (status) {
      case 'success':
        return showSuccessToast().title;
      case 'error':
        return showErrorToast().title;
      default:
        return showInfoToast.title;
    }
  };

  //Функція виведення опису тоста
  const getToastDescription = (status: ToastStatus): string => {
    switch (status) {
      case 'success':
        return showSuccessToast().description;
      case 'error':
        return showErrorToast().description;
      default:
        return showInfoToast.description;
    }
  };

  return { getToastTitle, getToastDescription };
};

export default useToastBody;
