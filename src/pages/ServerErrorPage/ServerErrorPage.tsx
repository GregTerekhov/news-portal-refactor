import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthRedux, useDB, useNewsAPI } from 'reduxStore/hooks';

import { VariantButton } from 'types';

import { PrimaryButton } from 'ui';
import { ErrorList, serverErrorsList } from './assistants';

const ErrorPage: FC<{}> = () => {
  const { isAuthenticated } = useAuthRedux();
  const { errorAPI } = useNewsAPI();
  const { errorDB } = useDB();
  const { authError } = useAuthRedux();
  const navigate = useNavigate();

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

  const handleGoHome = () => !anyServerError && navigate('/');
  const handleGoBack = () => navigate(-1);

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
      <div
        className={`${
          isAuthenticated ? 'justify-between gap-5 md:gap-x-20 lg:gap-x-36' : 'justify-center'
        } flex items-center`}
      >
        {isAuthenticated && (
          <PrimaryButton
            variant={VariantButton.Primary}
            id='Redirect to previous page button'
            onHandleClick={handleGoBack}
          >
            Go back
          </PrimaryButton>
        )}
        <PrimaryButton
          variant={VariantButton.Primary}
          id='Redirect to home page button'
          onHandleClick={handleGoHome}
        >
          {isAuthenticated ? 'or Go Home' : 'Just Go Home'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ErrorPage;
