import { useAuthRedux, useDBRedux } from 'reduxStore/hooks';

import type { ToastMessage } from 'types';

const useToastSuccess = () => {
  const { statusMessage, haveAccounts } = useAuthRedux();
  const { dbSuccessMessage } = useDBRedux();

  //Функція виведення заголовка та опису для тостів успіху
  const chooseSuccessToastText = (statusMessage: string): ToastMessage => {
    let title = '';
    let description = '';

    //Визначення наявності значення прив'язаного акаунту
    const linkingAccount = Object.keys(haveAccounts).find((key) =>
      haveAccounts.hasOwnProperty(key),
    );

    switch (statusMessage) {
      case 'User sign-in success':
        title = 'Welcome';
        description = 'Welcome to New York Times News Viewer';
        break;
      case 'Your saved password has been successfully retrieved':
        title = 'Paste credentials';
        description = 'Your credentials have been successfully inserted';
        break;
      case 'Sign-out success':
        title = 'Goodbye';
        description = 'See you soon! We will be waiting for you with new news';
        break;
      case 'Email is successfully updated':
        title = 'Update credentials';
        description = 'Your email address has been successfully updated';
        break;
      case 'Password is successfully updated':
        title = 'Update credentials';
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
      case 'Your deleted news feed has been successfully cleared':
        title = 'Clearing log';
        description = 'Your deleted news feed has been successfully cleared';
        break;
      case `Account ${linkingAccount} linking successful`:
        title = 'Link Account';
        description = `Your ${linkingAccount} account is successfully linking`;
        break;
      case `Account ${linkingAccount} unlinking successful`:
        title = 'Unlink Account';
        description = `Your ${linkingAccount} account has unlinked successfully`;
        break;
      default:
        title = '';
        description = '';
        break;
    }

    return { title, description };
  };

  //Визначення статусу успіху в залежності від API
  const responseMessage = statusMessage || dbSuccessMessage;

  //Функція-обгортка
  const showSuccessToast = (): ToastMessage => {
    return chooseSuccessToastText(responseMessage);
  };

  return { showSuccessToast };
};

export default useToastSuccess;
