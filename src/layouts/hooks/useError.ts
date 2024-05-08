import { useNavigate } from 'react-router-dom';

import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';

import { Paths, useActiveLinks } from 'hooks';
import { isServerError } from '../../pages/template/assistants';

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
