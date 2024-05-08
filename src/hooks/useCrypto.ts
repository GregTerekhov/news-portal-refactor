import type { ResponseCryptoPassword } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import { decryptPassword } from 'helpers';

interface DecryptedData {
  savedPassword: string;
  email: string;
}

const useCrypto = () => {
  const { getCryptoPassword } = useAuthRedux();
  const { showToast } = useNotificationContext();

  const savedUserId = localStorage.getItem('userId');

  const fetchCryptoPassword = async (): Promise<DecryptedData | null> => {
    try {
      if (!savedUserId) return null;

      const response = await getCryptoPassword({
        userId: savedUserId,
      });

      const { cryptoData } = response.payload as ResponseCryptoPassword;
      const { exportedCryptoKey, encryptedPassword, salt, email } = cryptoData;

      const savedPassword = await decryptPassword(exportedCryptoKey, encryptedPassword, salt);

      showToast(response.meta.requestStatus);

      return { savedPassword, email };
    } catch (error) {
      console.error('Error during getCryptoPassword', error);
      throw error;
    }
  };

  return { fetchCryptoPassword };
};

export default useCrypto;
