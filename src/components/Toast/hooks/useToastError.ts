import { useAuthRedux, useNewsAPIRedux } from 'reduxStore/hooks';

import type { ToastErrorDescription, ToastErrorTitle, ToastMessage } from 'types';

const useToastError = () => {
  const { authError } = useAuthRedux();
  const { errorAPI } = useNewsAPIRedux();

  //Функція виведення заголовка та опису для тостів помилок
  const chooseErrorToastText = (status: string | number | null): ToastMessage => {
    let title: ToastErrorTitle = 'UnknownError';
    let description: ToastErrorDescription = 'Try to reload page';

    switch (status) {
      case 'Email already in use':
        title = 'Authorisation error';
        description = 'Email already in use';
        break;
      case 'User is not authentified':
        title = 'Authorisation error';
        description = 'Email or password are wrong';
        break;
      case 'Password is not valid':
        title = 'Authorisation error';
        description = 'Email or password are wrong';
        break;
      case 'User not found':
        title = 'Authorisation error';
        description = 'User is not found';
        break;
      case 'Password incorrect':
        title = 'Authorisation error';
        description = 'Password is wrong';
        break;
      case 429:
        title = 'News API Error';
        description = 'Too many requests';
        break;
      default:
        title = 'UnknownError';
        description = 'Try to reload page';
        break;
    }

    return { title, description };
  };

  //Визначення статусу помилки в залежності від API
  const status = authError || errorAPI || null;

  //Функція-обгортка
  const showErrorToast = (): ToastMessage => {
    return chooseErrorToastText(status);
  };

  return {
    showErrorToast,
  };
};

export default useToastError;
