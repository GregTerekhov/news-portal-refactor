import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';

const useError = () => {
  const { errorDB } = useDBRedux();
  const { authError } = useAuthRedux();
  const { errorAPI } = useNewsAPIRedux();

  const navigate = useNavigate();

  useEffect(() => {
    if (
      (errorDB && isServerError(errorDB)) ||
      (errorAPI && isServerError(errorAPI)) ||
      (authError && isServerError(authError))
    ) {
      navigate('/server-error');
    }
  }, [errorDB, errorAPI, authError]);

  function isServerError(error: unknown) {
    return error && typeof error === 'number' && error >= 500;
  }
};

export default useError;
