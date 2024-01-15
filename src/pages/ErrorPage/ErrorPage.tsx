import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthRedux } from 'reduxStore/hooks';

import { VariantButton } from 'types';
import { errorImages } from 'constants/images';
import { generateContentImages } from 'helpers';
import { useCacheImage } from 'hooks';

import { PrimaryButton } from 'ui';

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

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='space-y-10 text-center lg:w-[900px] lg:mx-auto'>
      <img
        className='mx-auto'
        src={imageUrl}
        alt='Error page'
        width={matchedErrorImage.width}
        height={matchedErrorImage.height}
      />
      <h1 className='text-5xl text-darkBase dark:text-whiteBase transition-colors duration-500'>
        Page not found
      </h1>
      <p className='text-xl text-justify md:text-center text-darkBase dark:text-whiteBase transition-colors duration-500'>
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
