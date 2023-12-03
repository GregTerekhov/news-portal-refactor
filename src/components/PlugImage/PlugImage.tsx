import React, { FC } from 'react';

import { generateContentImages } from 'helpers';
import { useCacheImage } from 'hooks';
import { plugImages } from 'constants/images';

const enum VariantImage {
  Page = 'page',
  Card = 'card',
}

interface PlugImageProps {
  variant: string;
}

const PlugImage: FC<PlugImageProps> = ({ variant }) => {
  const devicePixelRatio = window.devicePixelRatio || 1;

  const matchedPlugImage = generateContentImages(
    plugImages,
    devicePixelRatio,
    'image/webp',
    window.innerWidth,
  );

  const imageUrl = useCacheImage(matchedPlugImage?.src || '');

  return (
    <>
      {variant === VariantImage.Page ? (
        <div className='flex flex-col items-center justify-center'>
          <p className='text-darkBase dark:text-whiteBase text-2xl font-bold tracking-smallTight mb-10 text-center md:text-5xl md:tracking-tighter md:w-[548px] transition-colors duration-500'>
            We haven’t found news from this category
          </p>
          <img src={imageUrl} alt='No found news' />
        </div>
      ) : (
        <img src={imageUrl} alt='No found news' />
      )}
    </>
  );
};

export default PlugImage;
