import { useAuthRedux, useNewsAPI } from 'reduxStore/hooks';

import { ToastMessage } from 'types';

const useToastError = () => {
  const { authError } = useAuthRedux();
  const { errorAPI } = useNewsAPI();

  const chooseErrorToastText = (status: string | number | undefined): ToastMessage => {
    let title = '';
    let description = '';

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
        title = '';
        description = '';
        break;
    }

    return { title, description };
  };

  const status =
    authError && authError.message ? authError.message : errorAPI ? errorAPI : undefined;

  const showErrorToast = (): ToastMessage => {
    return chooseErrorToastText(status);
  };

  return {
    showErrorToast,
  };
};

export default useToastError;
