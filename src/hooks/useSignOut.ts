import { useNavigate } from 'react-router-dom';

import { Paths } from './commonTypes';
import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import { localStorageOperation } from 'helpers';

const useSignOut = (closeMenu?: (() => void) | undefined) => {
  const { logout } = useAuthRedux();
  const { showToast } = useNotificationContext();

  const navigate = useNavigate();

  //Функція виходу з акаунту
  const handleSignOut = async (): Promise<void> => {
    if (typeof closeMenu === 'function') closeMenu();

    const response = await logout();

    showToast(response.meta.requestStatus);
    localStorageOperation('remove', '_persist');
    navigate(Paths.Home);
  };

  return { handleSignOut };
};

export default useSignOut;
