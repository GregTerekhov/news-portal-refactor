import React, { FC } from 'react';

import type { ErrorList } from 'types';
import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';

import { NavigationErrorButtons } from 'components';
import { serverErrorsList } from './assistants';

const ErrorPage: FC<{}> = () => {
  const { errorAPI } = useNewsAPIRedux();
  const { errorDB } = useDBRedux();
  const { authError } = useAuthRedux();

  const errorCodes = [errorAPI, errorDB, authError];
  const anyServerError = errorCodes.some((code) => typeof code === 'number' && code >= 500);

  const renderedPageContent: ErrorList | undefined = serverErrorsList.find((value: ErrorList) => {
    return errorCodes.some((code) => typeof code === 'number' && value.code === code);
  });

  return (
    <div className='space-y-10 text-center lg:mx-auto lg:w-900px'>
      <h1 className='text-[100px] text-darkBase transition-colors duration-500 dark:text-whiteBase'>
        {renderedPageContent?.code}
      </h1>
      <h2 className='text-5xl text-darkBase transition-colors duration-500 dark:text-whiteBase'>
        {renderedPageContent?.warning}
      </h2>
      <p className='text-justify text-xl text-darkBase transition-colors duration-500 dark:text-whiteBase md:text-center'>
        {renderedPageContent?.message}
      </p>
      <NavigationErrorButtons anyServerError={anyServerError} />
    </div>
  );
};

export default ErrorPage;
