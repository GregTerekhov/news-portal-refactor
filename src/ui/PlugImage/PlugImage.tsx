import React, { FC } from 'react';

import { useNewsAPIRedux } from 'reduxStore/hooks';

import { plugImages } from 'constants/images';
import { generateContentImages } from 'helpers';
import { useActiveLinks, useCacheImage } from 'hooks';
import { generateText, plugImageTextStyles } from './assistants';

interface PlugImageProps {
  variant: string;
}

const PlugImage: FC<PlugImageProps> = ({ variant }) => {
  const { errorAPI } = useNewsAPIRedux();
  const { isHomeActive } = useActiveLinks();

  const isErrorAPI = errorAPI?.toString().includes('429');

  const devicePixelRatio = window.devicePixelRatio || 1;

  const matchedPlugImage = generateContentImages(plugImages, devicePixelRatio, window.innerWidth);

  const imageUrl = useCacheImage(matchedPlugImage?.src || '');

  return (
    <>
      {variant === 'page' ? (
        <div className='flex flex-col items-center justify-center space-y-10'>
          <p className={plugImageTextStyles}>{generateText(isHomeActive, isErrorAPI)}</p>
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
