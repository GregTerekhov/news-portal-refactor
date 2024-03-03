interface Image {
  type: string;
  dpi: number;
  src: string;
  screenSize: number;
  width: number;
  height: number;
}

const MOBILE_WIDTH = 320;

// Перевірка, чи підтримує браузер формат WEBP
const isWebPSupported = (() => {
  const elem = document.createElement('canvas');

  return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
})();

export default function generateContentImages(
  images: Image[],
  devicePixelRatio: number,
  screenSize: number,
): Image {
  const suitableImages = images.filter((image) => {
    if (screenSize < MOBILE_WIDTH) {
      return image.screenSize === MOBILE_WIDTH;
    } else {
      return screenSize >= image.screenSize;
    }
  });

  for (const image of suitableImages) {
    if (isWebPSupported && image.type === 'image/webp' && devicePixelRatio === image.dpi) {
      return image;
    } else if (
      !isWebPSupported &&
      (image.type === 'image/png' || image.type === 'image/jpg') &&
      devicePixelRatio === image.dpi
    ) {
      return image;
    }
  }

  return suitableImages[suitableImages.length - 1];
}
