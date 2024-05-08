import React, { FC } from 'react';

import type { ErrorList } from 'types';
import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';
import { ErrorTemplate } from '../template';

import { serverErrorsList } from './assistants';

const ErrorPage: FC = () => {
  const { errorAPI } = useNewsAPIRedux();
  const { errorDB } = useDBRedux();
  const { authError } = useAuthRedux();

  const errorCodes = [errorAPI, errorDB, authError];

  const renderedPageContent: ErrorList | undefined = serverErrorsList.find((value: ErrorList) => {
    return errorCodes.some((code) => typeof code === 'number' && value.code === code);
  });

  return (
    <ErrorTemplate
      title={renderedPageContent?.code ?? ''}
      description={renderedPageContent?.message ?? ''}
      titleStyles='text-[100px]'
    >
      <h2 className='text-5xl text-darkBase transition-colors duration-500 dark:text-whiteBase'>
        {renderedPageContent?.warning}
      </h2>
    </ErrorTemplate>
  );
};

export default ErrorPage;
