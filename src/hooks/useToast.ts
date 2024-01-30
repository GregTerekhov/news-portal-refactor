import { useAuthRedux, useNewsAPI } from 'reduxStore/hooks';

const useToast = () => {
  const { authError } = useAuthRedux();
  const { errorAPI } = useNewsAPI();

  const chooseErrorToastText = (status: string | number | undefined): string => {
    let toastText = '';

    switch (status) {
      case 'Email already in use':
        toastText = 'Email already in use';
        break;
      case 'User is not authentified':
        toastText = 'Email or password are wrong';
        break;
      case 'Password is not valid':
        toastText = 'Email or password are wrong';
        break;
      case 'User not found':
        toastText = 'User is not found';
        break;
      case 'Password incorrect':
        toastText = 'Password is wrong';
        break;
      case 429:
        toastText = 'Too many requests';
        break;
      default:
        toastText = '';
        break;
    }

    return toastText;
  };

  const status =
    authError && authError.message ? authError.message : errorAPI ? errorAPI : undefined;

  const showErrorToast = (): string => {
    return chooseErrorToastText(status);
  };

  return {
    showErrorToast,
  };
};

export default useToast;
