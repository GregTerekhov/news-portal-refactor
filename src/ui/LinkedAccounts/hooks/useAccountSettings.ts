import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { Paths, type GoogleAuth } from 'types';

import { Config, CONFIG } from 'config';
import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { usePopUp } from 'hooks';
import { getButtonsData } from '../assistants';

const { GOOGLE_LOGIN_LINK }: Config = CONFIG;

const useAccountSettings = () => {
  const {
    isAuthenticated,
    requestStatus,
    enterWithGoogle,
    bindGoogle,
    haveAccounts,
    unbindGoogle,
  } = useAuthRedux();
  const { setIsScrollDisabled } = useScrollBodyContext();
  const { showToast } = useNotificationContext();

  const navigate = useNavigate();

  const { toggleModal } = usePopUp();

  //Функція google-автентифікації або прив'зяки google-акаунту в залежності від стану isAuthenticated
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const { email, sub }: GoogleAuth = await axios
          .get(`${GOOGLE_LOGIN_LINK}`, {
            headers: { Authorization: `Bearer ${codeResponse.access_token}` },
          })
          .then((res) => res.data);

        if (!isAuthenticated) {
          await enterWithGoogle({ email, sub });

          requestStatus && showToast(requestStatus);
          setIsScrollDisabled(false);
          toggleModal();
        } else {
          await bindGoogle({ email });

          requestStatus && showToast(requestStatus);
        }
      } catch (error) {
        console.error('Failed to login with Google: ', error);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //Функція обробки кліку по кнопці google-auth
  const handleGoogleLinkClick = async (): Promise<void> => {
    if (haveAccounts.google) {
      await unbindGoogle();

      requestStatus && showToast(requestStatus);
    } else {
      googleLogin();
    }
  };

  const redirectOnDevelopmentPage = (): void => {
    if (!isAuthenticated) toggleModal();
    navigate(Paths.InDevelopment);
  };

  return {
    googleLogin,
    handleGoogleLinkClick,
    accountButtons: getButtonsData(haveAccounts, handleGoogleLinkClick, redirectOnDevelopmentPage),
  };
};

export default useAccountSettings;
