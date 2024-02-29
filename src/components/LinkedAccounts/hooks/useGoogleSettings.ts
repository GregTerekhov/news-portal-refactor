import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

import { useAuthRedux } from 'reduxStore/hooks';
import { CONFIG } from 'config';

type VerifiedGoogleEmail = {
  email: string;
  sub: string;
};

const useGoogleSettings = () => {
  const { isAuthenticated, enterWithGoogle, bindGoogle } = useAuthRedux();

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const userInfo: VerifiedGoogleEmail = await axios
          .get(`${CONFIG.GOOGLE_LOGIN_LINK}`, {
            headers: { Authorization: `Bearer ${codeResponse.access_token}` },
          })
          .then((res) => res.data);
        console.log('userInfo', userInfo);

        if (!isAuthenticated) {
          const response = enterWithGoogle({ email: userInfo.email, sub: userInfo.sub });
          console.log('enterWithGoogle', response);
        } else {
          const response = bindGoogle({ email: userInfo.email });
          console.log('bindGoogle', response);
        }
      } catch (error) {
        console.log('Failed to login', error);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { googleLogin };
};

export default useGoogleSettings;
