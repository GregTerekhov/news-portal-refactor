import {
  type HaveAccounts,
  SuccessCaseWithoutAccount,
  type ToastMessage,
  ToastSuccessCases,
  type ToastSuccessDescription,
  ToastSuccessDescriptionWithoutAccount,
  ToastSuccessTitle,
} from 'types';
import { useAuthRedux, useDBRedux } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';
import { getHasAccount } from '../assistants';

const useToastSuccess = () => {
  const { statusMessage, haveAccounts } = useAuthRedux();
  const { dbSuccessMessage } = useDBRedux();

  const { isArchiveActive } = useActiveLinks();

  //Функція виведення заголовка та опису для тостів успіху
  const chooseSuccessToastText = (
    statusMessage: ToastSuccessCases<keyof HaveAccounts>,
  ): ToastMessage => {
    let title: ToastSuccessTitle = ToastSuccessTitle.Default;
    let description: ToastSuccessDescription<keyof HaveAccounts>;

    //Визначення наявності значення прив'язаного акаунту
    const linkingAccount = getHasAccount(haveAccounts);

    switch (statusMessage) {
      case SuccessCaseWithoutAccount.SignIn:
      case SuccessCaseWithoutAccount.SignUp:
        title = ToastSuccessTitle.Welcome;
        description = ToastSuccessDescriptionWithoutAccount.Welcome;
        break;
      case SuccessCaseWithoutAccount.RememberMe:
        title = ToastSuccessTitle.PasteCredentials;
        description = ToastSuccessDescriptionWithoutAccount.RememberMe;
        break;
      case SuccessCaseWithoutAccount.SignOut:
        title = ToastSuccessTitle.Goodbye;
        description = ToastSuccessDescriptionWithoutAccount.Goodbye;
        break;
      case SuccessCaseWithoutAccount.UpdateEmail:
        title = ToastSuccessTitle.UpdateCredentials;
        description = ToastSuccessDescriptionWithoutAccount.UpdateEmail;
        break;
      case SuccessCaseWithoutAccount.UpdatePassword:
        title = ToastSuccessTitle.UpdateCredentials;
        description = ToastSuccessDescriptionWithoutAccount.UpdatePassword;
        break;
      case SuccessCaseWithoutAccount.RecoveryPasswordSent:
        title = ToastSuccessTitle.SendRecovery;
        description = ToastSuccessDescriptionWithoutAccount.SendRecovery;
        break;
      case SuccessCaseWithoutAccount.PasswordChange:
        title = ToastSuccessTitle.RecoverPassword;
        description = ToastSuccessDescriptionWithoutAccount.RecoveryPassword;
        break;
      case SuccessCaseWithoutAccount.DeleteNews:
        title = ToastSuccessTitle.DeleteNews;
        description = ToastSuccessDescriptionWithoutAccount.DeleteNews;
        break;
      case SuccessCaseWithoutAccount.ClearLog:
        title = ToastSuccessTitle.ClearLog;
        description = ToastSuccessDescriptionWithoutAccount.ClearLog;
        break;
      case `Account ${linkingAccount} linking successful`:
        title = ToastSuccessTitle.LinkAccount;
        description = `Your ${linkingAccount} account is successfully linking`;
        break;
      case `Account ${linkingAccount} unlinking successful`:
        title = ToastSuccessTitle.UnlinkAccount;
        description = `Your ${linkingAccount} account has unlinked successfully`;
        break;
      default:
        title = ToastSuccessTitle.Default;
        description = ToastSuccessDescriptionWithoutAccount.Default;
        break;
    }

    return { title, description };
  };
  //Визначення статусу успіху в залежності від API
  const responseMessage = !isArchiveActive ? statusMessage : dbSuccessMessage;

  //Функція-обгортка
  const showSuccessToast = (): ToastMessage => {
    return chooseSuccessToastText(responseMessage as ToastSuccessCases<keyof HaveAccounts>);
  };

  return { showSuccessToast };
};

export default useToastSuccess;
