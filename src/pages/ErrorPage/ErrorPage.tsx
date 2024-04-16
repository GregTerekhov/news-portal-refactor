import React, { FC } from 'react';

import { errorImages } from 'constants/images';
import { generateContentImages } from 'helpers';
import { useCacheImage } from 'hooks';

import { NavigationErrorButtons } from 'components';

const ErrorPage: FC<{}> = () => {
  const devicePixelRatio = window.devicePixelRatio || 1;

  const matchedErrorImage = generateContentImages(errorImages, devicePixelRatio, window.innerWidth);
  const imageUrl = useCacheImage(matchedErrorImage?.src || '');

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
      <NavigationErrorButtons />
    </div>
  );
};

export default ErrorPage;
