import { useAuthRedux } from 'reduxStore/hooks';

const useToast = () => {
  const { authError } = useAuthRedux();

  const chooseErrorToastText = (status: string | undefined): string => {
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

      default:
        toastText = '';
        break;
    }

    return toastText;
  };

  const showErrorToast = (): string => {
    return chooseErrorToastText(authError?.message);
  };

  return {
    showErrorToast,
  };
};

export default useToast;
