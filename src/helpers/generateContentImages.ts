import { BreakpointValue, ImageType, type StaticImage } from 'types';

// Перевірка, чи підтримує браузер формат WEBP
const isWebPSupported: boolean = (() => {
  const elem = document.createElement('canvas');

  return elem.toDataURL(ImageType.WebP).indexOf(`data:${ImageType.WebP}`) === 0;
})();

//Перевірка на формат webP
const isWebPImage = (image: StaticImage, devicePixelRatio: number): boolean =>
  isWebPSupported && image.type === ImageType.WebP && devicePixelRatio === image.dpi;

//Перевірка на формат jpg/png
const isRegularImage = (image: StaticImage, devicePixelRatio: number): boolean =>
  (image.type === ImageType.Png || image.type === ImageType.Jpg) && devicePixelRatio === image.dpi;

//Фільтрація зображень
const filterSuitableImage = (images: StaticImage[], screenSize: number): StaticImage[] =>
  images.filter((image) =>
    screenSize < BreakpointValue.Mobile
      ? image.screenSize === BreakpointValue.Mobile
      : screenSize >= image.screenSize,
  );

//Функція генерації контентних зображень під відповідні розміри екрану, значень devicePixelRatio та (не-)підтримки формату webp
export default function generateContentImages(
  images: StaticImage[],
  devicePixelRatio: number,
  screenSize: number,
): StaticImage {
  const suitableImages = filterSuitableImage(images, screenSize);

  for (const image of suitableImages) {
    const isWebP = isWebPImage(image, devicePixelRatio);
    const isRegular = isRegularImage(image, devicePixelRatio);

    if (isWebP || isRegular) {
      return image;
    }
  }

  return suitableImages[suitableImages.length - 1];
}
