import type { StaticImage } from 'types';

import { memberFirstImages, memberSecondImages, memberThirdImages } from 'constants/images';
import { generateContentImages } from 'helpers';

export const getMatchedImages = (): StaticImage[] => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const memberImages = [memberFirstImages, memberSecondImages, memberThirdImages];

  return memberImages.map((images) =>
    generateContentImages(images, devicePixelRatio, window.innerWidth),
  );
};
