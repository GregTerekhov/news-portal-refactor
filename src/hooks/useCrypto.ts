import { useAuthRedux } from 'reduxStore/hooks';

import { ResponseCryptoPassword } from 'types';
import { decryptPassword } from 'helpers';

const useCrypto = () => {
  const { getCryptoPassword } = useAuthRedux();
  const isCredentialsRemembered = localStorage.getItem('rememberMe');
  const savedUserId = localStorage.getItem('userId');

  const fetchCryptoPassword = async () => {
    if (isCredentialsRemembered && savedUserId) {
      const response = await getCryptoPassword({ userId: savedUserId });
      const { cryptoData } = response.payload as ResponseCryptoPassword;
      const { encryptedPassword, salt, email } = cryptoData;

      const savedPassword = await decryptPassword(encryptedPassword, salt);

      return { savedPassword, email };
    }

    return null;
  };

  return { fetchCryptoPassword };
};

export default useCrypto;
