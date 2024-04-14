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
const isWebPSupported: boolean = (() => {
  const elem = document.createElement('canvas');

  return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
})();

//Перевірка на формат webP
const isWebPImage = (image: Image, devicePixelRatio: number): boolean =>
  isWebPSupported && image.type === 'image/webp' && devicePixelRatio === image.dpi;

//Перевірка на формат jpg/png
const isRegularImage = (image: Image, devicePixelRatio: number): boolean =>
  (image.type === 'image/png' || image.type === 'image/jpg') && devicePixelRatio === image.dpi;

//Фільтрація зображень
const filterSuitableImage = (images: Image[], screenSize: number): Image[] =>
  images.filter((image) =>
    screenSize < MOBILE_WIDTH ? image.screenSize === MOBILE_WIDTH : screenSize >= image.screenSize,
  );

//Функція генерації контентних зображень під відповідні розміри екрану, значень devicePixelRatio та (не-)підтримки формату webp
export default function generateContentImages(
  images: Image[],
  devicePixelRatio: number,
  screenSize: number,
): Image {
  const suitableImages = filterSuitableImage(images, screenSize);

  for (const image of suitableImages) {
    if (isWebPImage(image, devicePixelRatio) || isRegularImage(image, devicePixelRatio)) {
      return image;
    }
  }

  return suitableImages[suitableImages.length - 1];
}
