import { ErrorCase, ToastErrorDescription, ToastErrorTitle, type ToastMessage } from 'types';
import { useAuthRedux, useNewsAPIRedux } from 'reduxStore/hooks';

const useToastError = () => {
  const { authError } = useAuthRedux();
  const { errorAPI } = useNewsAPIRedux();

  //Функція виведення заголовка та опису для тостів помилок
  const chooseErrorToastText = (status: ErrorCase): ToastMessage => {
    let title: ToastErrorTitle = ToastErrorTitle.Unknown;
    let description: ToastErrorDescription = ToastErrorDescription.Unknown;

    switch (status) {
      case ErrorCase.Conflict:
        title = ToastErrorTitle.Auth;
        description = ToastErrorDescription.Conflict;
        break;
      case ErrorCase.NotAuthorised:
        title = ToastErrorTitle.Auth;
        description = ToastErrorDescription.BadCredentialsRequest;
        break;
      case ErrorCase.InvalidPassword:
        title = ToastErrorTitle.Auth;
        description = ToastErrorDescription.BadCredentialsRequest;
        break;
      case ErrorCase.NotFound:
        title = ToastErrorTitle.Auth;
        description = ToastErrorDescription.NotFound;
        break;
      case ErrorCase.IncorrectPassword:
        title = ToastErrorTitle.Auth;
        description = ToastErrorDescription.BadPasswordRequest;
        break;
      case ErrorCase.TooManyRequest:
        title = ToastErrorTitle.API;
        description = ToastErrorDescription.ManyRequests;
        break;
      default:
        title = ToastErrorTitle.Unknown;
        description = ToastErrorDescription.Unknown;
        break;
    }

    return { title, description };
  };

  //Визначення статусу помилки в залежності від API
  const status = (authError || errorAPI) ?? null;

  //Функція-обгортка
  const showErrorToast = (): ToastMessage => {
    return chooseErrorToastText(status as ErrorCase);
  };

  return {
    showErrorToast,
  };
};

export default useToastError;
