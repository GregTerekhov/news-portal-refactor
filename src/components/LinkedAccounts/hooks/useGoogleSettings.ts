import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext, useScrollBodyContext } from 'contexts';

import { CONFIG } from 'config';
import type { GoogleAuth } from 'types';

type AccountsButton = {
  svgName: string;
  account: string;
  hasAccount: boolean;
  onClick: (() => Promise<void>) | (() => void);
};

const useGoogleSettings = () => {
  const { isAuthenticated, enterWithGoogle, bindGoogle, haveAccounts, unbindGoogle } =
    useAuthRedux();
  const { setIsScrollDisabled } = useScrollBodyContext();
  const { showToast } = useNotificationContext();

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
  const handleGoogleLinkClick = async () => {
    if (haveAccounts.google) {
      const response = await unbindGoogle();

      showToast(response.meta.requestStatus);
    } else {
      googleLogin();
    }
  };

  //Data для third-party-auth кнопок
  const accountButtons: AccountsButton[] = [
    {
      svgName: 'google',
      account: 'Google',
      hasAccount: haveAccounts.google,
      onClick: handleGoogleLinkClick,
    },
    {
      svgName: 'facebook',
      account: 'Facebook',
      hasAccount: haveAccounts.facebook,
      onClick: () => {
        console.log('facebook');
      },
    },
    {
      svgName: 'apple',
      account: 'Apple',
      hasAccount: haveAccounts.apple,
      onClick: () => console.log('apple'),
    },
  ];

  return { googleLogin, handleGoogleLinkClick, accountButtons };
};

export default useGoogleSettings;
