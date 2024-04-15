import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { VariantButton } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';

import { errorImages } from 'constants/images';
import { generateContentImages } from 'helpers';
import { useCacheImage } from 'hooks';

import { PrimaryButton } from 'ui';

const ErrorPage: FC<{}> = () => {
  const { isAuthenticated } = useAuthRedux();

  const navigate = useNavigate();

  const devicePixelRatio = window.devicePixelRatio || 1;

  const matchedErrorImage = generateContentImages(errorImages, devicePixelRatio, window.innerWidth);
  const imageUrl = useCacheImage(matchedErrorImage?.src || '');

  //Функції навігації зі сторінки помилки
  const handleGoHome = () => navigate('/');
  const handleGoBack = () => navigate(-1);

  return (
    <div className='space-y-10 text-center lg:mx-auto lg:w-900px'>
      <img
        className='mx-auto'
        src={imageUrl}
        alt='Error page'
        width={matchedErrorImage.width}
        height={matchedErrorImage.height}
      />
      <h2 className='text-5xl text-darkBase transition-colors duration-500 dark:text-whiteBase'>
        Page not found
      </h2>
      <p className='text-justify text-xl text-darkBase transition-colors duration-500 dark:text-whiteBase md:text-center'>
        Looks like you'we lost a bit. The page you requested could not be found or maybe don't even
        exist. How about to make a step back and try again?
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
