import { SetStateAction, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAuthRedux } from 'reduxStore/hooks';

const useProcessingParams = (
  setIsOpenModal: (value: SetStateAction<boolean>) => void,
  setIsScrollDisabled: (value: SetStateAction<boolean>) => void,
) => {
  const [passwordToken, setPasswordToken] = useState(false);
  const [searchParams] = useSearchParams();
  const token: string | null = searchParams.get('token');
  const openModal: string | null = searchParams.get('openModal');

  const { user, writeTokens } = useAuthRedux();

  useEffect(() => {
    if (!user.id && token && openModal) {
      setPasswordToken(true);
      writeTokens({ accessToken: token, refreshToken: null });
      setIsOpenModal(true);
      setIsScrollDisabled(true);
    }
  }, [token, openModal, user]);

  return { passwordToken };
};

export default useProcessingParams;
