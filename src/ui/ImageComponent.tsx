import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchImage } from 'helpers';

interface IImage {
  imageName: string;
}

const ImageComponent: FC<IImage> = ({ imageName }) => {
  const { data: imageUrl, isLoading } = useQuery({
    queryKey: ['image', imageName],
    queryFn: () => fetchImage(imageName),
  });

  if (isLoading) {
    return <p>Loading image...</p>;
  }

  return <img src={imageUrl} alt={imageName} />;
};

export default ImageComponent;
