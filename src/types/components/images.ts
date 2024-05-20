export interface StaticImage {
  type: ImageType;
  dpi: number;
  src: string;
  screenSize: number;
  width: number;
  height: number;
}

export enum ImageType {
  WebP = 'image/webp',
  Png = 'image/png',
  Jpg = 'image/jpg',
}
