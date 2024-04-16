import React, { FC } from 'react';

import type { ErrorList } from 'types';
import { useAuthRedux, useDBRedux, useNewsAPIRedux } from 'reduxStore/hooks';

import { NavigationErrorButtons } from 'components';
import { serverErrorsList } from './assistants';

const ErrorPage: FC<{}> = () => {
  const { errorAPI } = useNewsAPIRedux();
  const { errorDB } = useDBRedux();
  const { authError } = useAuthRedux();

  const APIServerError = errorAPI && typeof errorAPI === 'number' && errorAPI >= 500;
  const DBServerError = errorDB && typeof errorDB === 'number' && errorDB >= 500;
  const authErrorDB = authError && typeof authError === 'number' && authError >= 500;
  const anyServerError = APIServerError || DBServerError || authErrorDB;

  const renderPageContent = serverErrorsList.find((value: ErrorList) => {
    if (APIServerError) return value.code === errorAPI;
    if (DBServerError) return value.code === errorDB;
    if (authErrorDB) return value.code === authError;

    return [];
  });

  return (
    <div className='space-y-10 text-center lg:mx-auto lg:w-900px'>
      <h1 className='text-[100px] text-darkBase transition-colors duration-500 dark:text-whiteBase'>
        {renderPageContent?.code}
      </h1>
      <h2 className='text-5xl text-darkBase transition-colors duration-500 dark:text-whiteBase'>
        {renderPageContent?.warning}
      </h2>
      <p className='text-justify text-xl text-darkBase transition-colors duration-500 dark:text-whiteBase md:text-center'>
        {renderPageContent?.message}
      </p>
      <NavigationErrorButtons anyServerError={anyServerError} />
    </div>
  );
};

export default ErrorPage;
