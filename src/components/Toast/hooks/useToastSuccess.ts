import { useAuthRedux, useDB } from 'reduxStore/hooks';

import { ToastMessage } from 'types';

const useToastSuccess = () => {
  const { statusMessage } = useAuthRedux();
  const { dbSuccessMessage } = useDB();

  const chooseSuccessToastText = (statusMessage: string): ToastMessage => {
    let title = '';
    let description = '';

    switch (statusMessage) {
      case 'User sign-in success':
        title = 'Welcome';
        description = 'Welcome to New York Times News Viewer';
        break;
      case 'Sign-out success':
        title = 'Goodbye';
        description = 'See you soon! We will be waiting for you with new news';
        break;
      case 'Email is successfully updated':
        title = 'Update credentials success';
        description = 'Your email address has been successfully updated';
        break;
      case 'Password is successfully updated':
        title = 'Update credentials success';
        description = 'Your password has been successfully updated';
        break;
      case 'Email sent successfully':
        title = 'Sending settings success';
        description =
          'Your request is successfully sent. Please check your email and follow the instructions for recovering your password';
        break;
      case 'Password has successfully changed':
        title = 'Password recovered';
        description = 'Your password successfully recovered';
        break;
      case 'Remove news success':
        title = 'Delete news';
        description = 'News has been successfully deleted';
        break;
      default:
        title = '';
        break;
    }

    return { title, description };
  };

  const responseMessage = statusMessage || dbSuccessMessage;

  const showSuccessToast = (): ToastMessage => {
    return chooseSuccessToastText(responseMessage);
  };

  return { showSuccessToast };
};

export default useToastSuccess;
