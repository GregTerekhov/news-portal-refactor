import React, { FC } from 'react';

import { ErrorCase, VariantPlug } from 'types';

import { useNewsAPIRedux } from 'reduxStore/hooks';

import { plugImages } from 'constants/images';
import { generateContentImages } from 'helpers';
import { useActiveLinks, useCache } from 'hooks';
import { generateText, plugImageTextStyles } from './assistants';

interface IPlugImageProps {
  variant: VariantPlug;
}

const PlugImage: FC<IPlugImageProps> = ({ variant }) => {
  const { errorAPI } = useNewsAPIRedux();

  const { isHomeActive } = useActiveLinks();
  const { cacheImage } = useCache();

  const isErrorAPI = errorAPI?.toString().includes(ErrorCase.TooManyRequest.toString());

  const devicePixelRatio = window.devicePixelRatio || 1;

  const { width, height, src } = generateContentImages(
    plugImages,
    devicePixelRatio,
    window.innerWidth,
  );

  const imageUrl = cacheImage(src || '');

  return (
    <>
      {variant === VariantPlug.Page ? (
        <div className='flex flex-col items-center justify-center space-y-10'>
          <p className={plugImageTextStyles}>{generateText(isHomeActive, isErrorAPI)}</p>
          <img
            src={imageUrl}
            alt={isErrorAPI && isHomeActive ? 'Too much requests' : 'No found news'}
            width={width}
            height={height}
          />
        </div>
      ) : (
        <img src={imageUrl} alt='No found an image for news' width={width} height={height} />
      )}
    </>
  );
};

export default PlugImage;
