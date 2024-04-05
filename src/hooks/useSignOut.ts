import { useNavigate } from 'react-router-dom';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

const useSignOut = (closeMenu?: (() => void) | undefined) => {
  const { logout } = useAuthRedux();
  const { showToast } = useNotificationContext();

  const navigate = useNavigate();

  //Функція виходу з акаунту
  const handleSignOut = async (): Promise<void> => {
    if (typeof closeMenu === 'function') {
      closeMenu();
    }
    const response = await logout();

    showToast(response.meta.requestStatus);
    localStorage.removeItem('_persist');
    navigate('/');
  };

  return { handleSignOut };
};

export default useSignOut;
