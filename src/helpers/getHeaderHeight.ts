import { HeaderHeight } from 'types';

const getHeaderHeight = (isTablet: boolean, isDesktop: boolean, isTV: boolean): number => {
  switch (true) {
    case isTablet:
      return HeaderHeight.Tablet;
    case isDesktop:
      return HeaderHeight.Desktop;
    case isTV:
      return HeaderHeight.TV;
    default:
      return HeaderHeight.Mobile;
  }
};

export default getHeaderHeight;
