import type { ErrorList } from 'types';

import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';

import { serverErrorsList } from '../assistants';

const useServerError = () => {
  const { errorAPI } = useNewsAPIRedux();
  const { errorDB } = useDBRedux();
  const { authError } = useAuthRedux();

  const errorCodes = [errorAPI, errorDB, authError].filter(
    (error): error is number => error !== null,
  );

  const renderedPageContent = serverErrorsList.find((value: ErrorList) => {
    return errorCodes.some((code) => typeof code === 'number' && value.code === code);
  });

  if (renderedPageContent) {
    return {
      code: renderedPageContent.code,
      warning: renderedPageContent.warning,
      message: renderedPageContent.message,
    };
  }
  return {};
};

export default useServerError;
