import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import type { ResponseCryptoPassword } from 'types';
import { decryptPassword } from 'helpers';

const useCrypto = () => {
  const { getCryptoPassword } = useAuthRedux();
  const { showToast } = useNotificationContext();

  const savedUserId = localStorage.getItem('userId');

  const fetchCryptoPassword = async () => {
    if (savedUserId) {
      const response = await getCryptoPassword({ userId: savedUserId });
      const { cryptoData } = response.payload as ResponseCryptoPassword;
      const { encryptionKey, encryptedPassword, salt, email } = cryptoData;

      const savedPassword = await decryptPassword(encryptionKey, encryptedPassword, salt);

      showToast(response.meta.requestStatus);

      return { savedPassword, email };
    }

    return null;
  };

  return { fetchCryptoPassword };
};

export default useCrypto;
