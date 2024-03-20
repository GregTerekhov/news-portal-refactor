import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotification, useScrollBodyContext } from 'contexts';

import { CONFIG } from 'config';
import type { GoogleAuth } from 'types';

const useGoogleSettings = () => {
  const { isAuthenticated, enterWithGoogle, bindGoogle } = useAuthRedux();
  const { setIsScrollDisabled } = useScrollBodyContext();
  const { showToast } = useNotification();

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

  return { googleLogin };
};

export default useGoogleSettings;
