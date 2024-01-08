import React, { FC } from 'react';

import { plugImages } from 'constants/images';
import { generateContentImages } from 'helpers';
import { useCacheImage } from 'hooks';

interface PlugImageProps {
  variant: string;
}

const PlugImage: FC<PlugImageProps> = ({ variant }) => {
  const devicePixelRatio = window.devicePixelRatio || 1;

  const matchedPlugImage = generateContentImages(
    plugImages,
    devicePixelRatio,
    // 'image/webp',
    window.innerWidth,
  );

  const imageUrl = useCacheImage(matchedPlugImage?.src || '');

  return (
    <>
      {variant === 'page' ? (
        <div className='flex flex-col items-center justify-center'>
          <p className='text-darkBase dark:text-whiteBase text-2xl font-bold tracking-smallTight mb-10 text-center md:text-5xl md:tracking-tighter md:w-[548px] transition-colors duration-500'>
            We haven’t found news from this category
          </p>
          <img
            src={imageUrl}
            alt='No found news'
            width={matchedPlugImage.width}
            height={matchedPlugImage.height}
          />
        </div>
      ) : (
        <img
          src={imageUrl}
          alt='No found news'
          width={matchedPlugImage.width}
          height={matchedPlugImage.height}
        />
      )}
    </>
  );
};

export default PlugImage;
