interface Image {
  type: string;
  dpi: number;
  src: string;
  screenSize: number;
  // width: number;
  // height: number;
}

export default function generateContentImages(
  images: Image[],
  devicePixelRatio: number,
  // preferredType: string,
  screenSize: number,
): Image {
  const suitableImages = images.filter((image) => {
    return screenSize >= image.screenSize;
  });

  for (const image of suitableImages) {
    if (devicePixelRatio === image.dpi) {
      return image;
    }
  }

  return suitableImages[suitableImages.length - 1];
}
