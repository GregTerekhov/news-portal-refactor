import type { MemberImage } from 'types';

const MOBILE_WIDTH = 320;

// Перевірка, чи підтримує браузер формат WEBP
const isWebPSupported: boolean = (() => {
  const elem = document.createElement('canvas');

  return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
})();

//Перевірка на формат webP
const isWebPImage = (image: MemberImage, devicePixelRatio: number): boolean =>
  isWebPSupported && image.type === 'image/webp' && devicePixelRatio === image.dpi;

//Перевірка на формат jpg/png
const isRegularImage = (image: MemberImage, devicePixelRatio: number): boolean =>
  (image.type === 'image/png' || image.type === 'image/jpg') && devicePixelRatio === image.dpi;

//Фільтрація зображень
const filterSuitableImage = (images: MemberImage[], screenSize: number): MemberImage[] =>
  images.filter((image) =>
    screenSize < MOBILE_WIDTH ? image.screenSize === MOBILE_WIDTH : screenSize >= image.screenSize,
  );

//Функція генерації контентних зображень під відповідні розміри екрану, значень devicePixelRatio та (не-)підтримки формату webp
export default function generateContentImages(
  images: MemberImage[],
  devicePixelRatio: number,
  screenSize: number,
): MemberImage {
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
