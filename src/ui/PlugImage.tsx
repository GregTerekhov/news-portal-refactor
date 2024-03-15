import React, { FC } from 'react';

import { useNewsAPI } from 'reduxStore/hooks';

import { plugImages } from 'constants/images';
import { generateContentImages } from 'helpers';
import { useActiveLinks, useCacheImage } from 'hooks';

interface PlugImageProps {
  variant: string;
}

const PlugImage: FC<PlugImageProps> = ({ variant }) => {
  const { errorAPI } = useNewsAPI();
  const { isHomeActive } = useActiveLinks();

  const isErrorAPI = errorAPI?.toString().includes('429');

  const devicePixelRatio = window.devicePixelRatio || 1;

  const matchedPlugImage = generateContentImages(plugImages, devicePixelRatio, window.innerWidth);

  const imageUrl = useCacheImage(matchedPlugImage?.src || '');

  const plugImageTextStyles =
    'mb-10 text-center text-2xl font-bold tracking-smallTight text-darkBase transition-colors dark:text-whiteBase md:w-548px md:text-5xl md:tracking-tighter';

  return (
    <>
      {variant === 'page' ? (
        <div className='flex flex-col items-center justify-center'>
          <p className={`${plugImageTextStyles}`}>
            {`${
              isErrorAPI && isHomeActive
                ? 'It seems you have been send too much requests then its needed'
                : 'We haven’t found news from this category'
            }`}
          </p>
          <img
            src={imageUrl}
            alt={`${isErrorAPI && isHomeActive ? 'Too much requests' : 'No found news'}`}
            width={matchedPlugImage.width}
            height={matchedPlugImage.height}
          />
        </div>
      ) : (
        <img
          src={imageUrl}
          alt='No found an image for news'
          width={matchedPlugImage.width}
          height={matchedPlugImage.height}
        />
      )}
    </>
  );
};

export default PlugImage;
