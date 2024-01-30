import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAuthRedux } from 'reduxStore/hooks';

import { VariantButton } from 'types';
import { errorImages } from 'constants/images';
import { generateContentImages } from 'helpers';
import { useCacheImage } from 'hooks';

import { PrimaryButton } from 'ui';
import { selectHasAPIError } from 'reduxStore/newsAPI';

import { serverErrorsList } from './assistants/serverErrorsList';

const ErrorPage: FC<{}> = () => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const { isAuthenticated } = useAuthRedux();
  const navigate = useNavigate();

  const matchedErrorImage = generateContentImages(
    errorImages,
    devicePixelRatio,
    // 'image/webp',
    window.innerWidth,
  );
  const imageUrl = useCacheImage(matchedErrorImage?.src || '');

  const errorAPI = useAppSelector(selectHasAPIError);
  const serverError = typeof errorAPI === 'number' && errorAPI >= 500;

  const renderContent = serverErrorsList.find((value: { code: number; message: string }) => {
    if (serverError) {
      return value.code === errorAPI;
    }
    return;
  });

  console.log(renderContent);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='space-y-10 text-center lg:w-[900px] lg:mx-auto'>
      {!serverError && (
        <img
          className='mx-auto'
          src={imageUrl}
          alt='Error page'
          width={matchedErrorImage.width}
          height={matchedErrorImage.height}
        />
      )}
      <h1 className='text-5xl text-darkBase dark:text-whiteBase transition-colors duration-500'>
        {serverError ? `${renderContent?.code}` : 'Page not found'}
      </h1>
      <p className='text-xl text-justify md:text-center text-darkBase dark:text-whiteBase transition-colors duration-500'>
        {serverError
          ? `${renderContent?.message}`
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
