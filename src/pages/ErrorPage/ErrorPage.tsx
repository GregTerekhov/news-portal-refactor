import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthRedux, useDB, useNewsAPI } from 'reduxStore/hooks';

import { VariantButton } from 'types';
import { errorImages } from 'constants/images';
import { generateContentImages } from 'helpers';
import { useCacheImage } from 'hooks';

import { PrimaryButton } from 'ui';
import { serverErrorsList } from './assistants/serverErrorsList';

const ErrorPage: FC<{}> = () => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const { isAuthenticated } = useAuthRedux();
  const navigate = useNavigate();
  const { errorAPI } = useNewsAPI();
  const { errorDB } = useDB();

  const anyServerError = errorAPI || errorDB;
  const APIServerError = errorAPI && errorAPI >= 500;
  const DBServerError = errorDB && errorDB >= 500;

  console.log(anyServerError, errorAPI, errorDB);

  const renderPageContent = serverErrorsList.find(
    (value: { code: number; warning: string; message: string }) => {
      if (APIServerError) {
        return value.code === errorAPI;
      }
      if (DBServerError) {
        return value.code === errorDB;
      }
      return;
    },
  );

  const matchedErrorImage = generateContentImages(
    errorImages,
    devicePixelRatio,
    // 'image/webp',
    window.innerWidth,
  );
  const imageUrl = useCacheImage(matchedErrorImage?.src || '');

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  console.log(renderPageContent);

  return (
    <div className='lg:w-900px space-y-10 text-center lg:mx-auto'>
      {anyServerError ? (
        <h1 className='m-0 p-0 text-[100px] text-darkBase transition-colors duration-500 dark:text-whiteBase'>
          {renderPageContent?.code}
        </h1>
      ) : (
        <img
          className='mx-auto'
          src={imageUrl}
          alt='Error page'
          width={matchedErrorImage.width}
          height={matchedErrorImage.height}
        />
      )}
      <h2 className='text-5xl text-darkBase transition-colors duration-500 dark:text-whiteBase'>
        {anyServerError ? `${renderPageContent?.warning}` : 'Page not found'}
      </h2>
      <p className='text-justify text-xl text-darkBase transition-colors duration-500 dark:text-whiteBase md:text-center'>
        {anyServerError
          ? `${renderPageContent?.message}`
          : "Looks like you'we lost a bit. The page you requested could not be found or maybe don't even exist. How about to make a step back and try again?"}
      </p>
      <div
        className={`${
          isAuthenticated ? 'justify-between gap-5 md:gap-x-20 lg:gap-x-36' : 'justify-center'
        } flex items-center`}
      >
        {isAuthenticated && (
          <PrimaryButton
            variant={VariantButton.Primary}
            id='redirect to previous page button'
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
