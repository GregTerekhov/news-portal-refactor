import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { isServerError } from '../assistants';

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
};

export default useError;
