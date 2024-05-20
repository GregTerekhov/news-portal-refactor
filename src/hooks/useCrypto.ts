import type { ResponseCryptoPassword } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';
import { useNotificationContext } from 'contexts';

import { decryptPassword, localStorageOperation, OperationType } from 'helpers';

interface IDecryptedData {
  savedPassword: string;
  email: string;
}

const useCrypto = () => {
  const { requestStatus, fetchCryptoCredentials } = useAuthRedux();
  const { showToast } = useNotificationContext();

  const savedUserId = localStorageOperation(OperationType.Get, 'userId');

  const retrieveDecryptedData = async (): Promise<IDecryptedData | null> => {
    try {
      if (!savedUserId) return null;

      const response = await fetchCryptoCredentials({
        userId: savedUserId,
      });

      const { cryptoData } = response.payload as ResponseCryptoPassword;
      const { exportedCryptoKey, encryptedPassword, salt, email } = cryptoData;

      const savedPassword = await decryptPassword(exportedCryptoKey, encryptedPassword, salt);

      requestStatus && showToast(requestStatus);

      return { savedPassword, email };
    } catch (error) {
      console.error('Error during getCryptoPassword: ', error);
      throw error;
    }
  };

  return { retrieveDecryptedData };
};

export default useCrypto;
