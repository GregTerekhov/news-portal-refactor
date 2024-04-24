import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import type { GoogleAuth } from 'types';
import { CONFIG } from 'config';
import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { usePopUp } from 'hooks';
import { getButtonsData } from '../assistants';

const useAccountSettings = () => {
  const { isAuthenticated, enterWithGoogle, bindGoogle, haveAccounts, unbindGoogle } =
    useAuthRedux();
  const { setIsScrollDisabled } = useScrollBodyContext();
  const { showToast } = useNotificationContext();

  const navigate = useNavigate();

  const { toggleModal } = usePopUp();

  //Функція google-автентифікації або прив'зяки google-акаунту в залежності від стану isAuthenticated
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const userInfo: GoogleAuth = await axios
          .get(`${CONFIG.GOOGLE_LOGIN_LINK}`, {
            headers: { Authorization: `Bearer ${codeResponse.access_token}` },
          })
          .then((res) => res.data);

        if (!isAuthenticated) {
          const response = await enterWithGoogle({ email: userInfo.email, sub: userInfo.sub });

          showToast(response.meta.requestStatus);
          setIsScrollDisabled(false);
        } else {
          const response = await bindGoogle({ email: userInfo.email });

          showToast(response.meta.requestStatus);
        }
      } catch (error) {
        console.error('Failed to login', error);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //Функція обробки кліку по кнопці google-auth
  const handleGoogleLinkClick = async (): Promise<void> => {
    if (haveAccounts.google) {
      const response = await unbindGoogle();

      showToast(response.meta.requestStatus);
    } else {
      googleLogin();
    }
  };

  const redirectOnDevelopmentPage = (): void => {
    if (!isAuthenticated) toggleModal();
    navigate('/in-development');
  };

  //Data для third-party-auth кнопок
  const accountButtons = getButtonsData(
    haveAccounts,
    handleGoogleLinkClick,
    redirectOnDevelopmentPage,
  );

  return { googleLogin, handleGoogleLinkClick, accountButtons };
};

export default useAccountSettings;
