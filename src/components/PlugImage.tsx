import React from 'react';

import { IMAGES } from 'constants';
import { generateContentImages } from 'helpers';

const enum V {
  Page = 'page',
  CardNews = 'card',
}

interface PlugImageVariants {
  variant: string;
}

const PlugImage = ({ variant }: PlugImageVariants) => {
  const devicePixelRatio = window.devicePixelRatio || 1;

  const matchedPlugImage = generateContentImages(
    IMAGES,
    devicePixelRatio,
    'image/webp',
    window.innerWidth,
  );

  return (
    <>
      {variant === V.Page ? (
        <div className='flex flex-col items-center justify-center'>
          <p className='text-darkBase dark:text-whiteBase text-2xl font-bold tracking-smallTight mb-10 text-center md:text-5xl md:tracking-tighter md:w-[548px]'>
            We haven’t found news from this category
          </p>
          <img src={matchedPlugImage?.src} alt='No found news' />
        </div>
      ) : (
        <img src={matchedPlugImage?.src} alt='No found news' />
      )}
    </>
  );
};

export default PlugImage;
