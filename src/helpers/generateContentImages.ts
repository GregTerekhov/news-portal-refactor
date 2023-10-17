interface Image {
  type: string;
  dpi: number;
  src: string;
  screenSize: number;
}

export default function generateContentImages(
  images: Image[],
  devicePixelRatio: number,
  preferredType: string,
  screenSize: number,
): Image {
  const suitableImages = images.filter((image) => {
    return image.screenSize <= screenSize;
  });

  const sortedImages = suitableImages.sort((a, b) => {
    if (b.dpi !== a.dpi) {
      return b.dpi - a.dpi;
    } else if (a.type === preferredType) {
      return -1;
    } else if (b.type === preferredType) {
      return 1;
    }
    return 0;
  });

  for (const image of sortedImages) {
    if (devicePixelRatio >= image.dpi) {
      return image;
    }
  }
  return sortedImages[sortedImages.length - 1];
}
