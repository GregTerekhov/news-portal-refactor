import type { ResponseCryptoPassword } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import { decryptPassword } from 'helpers';

const useCrypto = () => {
  const { getCryptoPassword } = useAuthRedux();
  const { showToast } = useNotificationContext();

  const savedUserId = localStorage.getItem('userId');

  const fetchCryptoPassword = async () => {
    if (savedUserId) {
      const response = await getCryptoPassword({
        userId: savedUserId,
      });
      const { cryptoData } = response.payload as ResponseCryptoPassword;
      const { exportedCryptoKey, encryptedPassword, salt, email } = cryptoData;

      const savedPassword = await decryptPassword(exportedCryptoKey, encryptedPassword, salt);

      showToast(response.meta.requestStatus);

      return { savedPassword, email };
    }

    return null;
  };

  return { fetchCryptoPassword };
};

export default useCrypto;
