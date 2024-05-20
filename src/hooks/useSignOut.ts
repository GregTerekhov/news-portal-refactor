import { useNavigate } from 'react-router-dom';

import { Paths } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import { localStorageOperation, OperationType } from 'helpers';

const useSignOut = (closeMenu?: (() => void) | undefined) => {
  const { requestStatus, logout } = useAuthRedux();
  const { showToast } = useNotificationContext();

  const navigate = useNavigate();

  //Функція виходу з акаунту
  const handleSignOut = async (): Promise<void> => {
    if (typeof closeMenu === 'function') closeMenu();

    await logout();

    requestStatus && showToast(requestStatus);

    localStorageOperation(OperationType.Remove, '_persist');
    navigate(Paths.Home);
  };

  return { handleSignOut };
};

export default useSignOut;
