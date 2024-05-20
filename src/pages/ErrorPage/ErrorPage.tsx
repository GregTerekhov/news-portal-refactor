import React, { FC } from 'react';

import { ErrorTemplate } from '../template';

import { errorImages } from 'constants/images';
import { generateContentImages } from 'helpers';
import { useCache } from 'hooks';

const ErrorPage: FC = () => {
  const { cacheImage } = useCache();

  const devicePixelRatio = window.devicePixelRatio || 1;

  const matchedErrorImage = generateContentImages(errorImages, devicePixelRatio, window.innerWidth);
  const imageUrl = cacheImage(matchedErrorImage?.src || '');

  return (
    <ErrorTemplate
      title='Page not found'
      description='Looks like you`we lost a bit. The page you requested could not be found or maybe don`t even exist. How about to make a step back and try again?'
      titleStyles='text-5xl'
    >
      <img
        className='mx-auto'
        src={imageUrl}
        alt='Error page'
        width={matchedErrorImage.width}
        height={matchedErrorImage.height}
      />
    </ErrorTemplate>
  );
};

export default ErrorPage;
