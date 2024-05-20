import { useNavigate } from 'react-router-dom';

import { Paths } from 'types';

import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';

import { useActiveLinks } from 'hooks';
import { isServerError } from '../assistants';

const useError = () => {
  const { errorDB } = useDBRedux();
  const { authError } = useAuthRedux();
  const { errorAPI } = useNewsAPIRedux();

  const navigate = useNavigate();

  const { isServerErrorPage } = useActiveLinks();

  const redirectToServerErrorPage = () => {
    if (
      !isServerErrorPage &&
      ((!!errorDB && isServerError(errorDB)) ||
        (!!errorAPI && isServerError(errorAPI)) ||
        (!!authError && isServerError(authError)))
    ) {
      navigate(Paths.ServerError);
    }
  };

  return { redirectToServerErrorPage };
};

export default useError;
