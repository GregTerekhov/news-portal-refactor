const MOBILE_HEADER_HEIGHT = 81;
const TABLET_HEADER_HEIGHT = 106;
const DESKTOP_HEADER_HEIGHT = 113;
const TV_HEADER_HEIGHT = 136;

const getHeaderHeight = (isTablet: boolean, isDesktop: boolean, isTV: boolean): number => {
  const headerHeight = {
    mobileHeight: MOBILE_HEADER_HEIGHT,
    tabletHeight: TABLET_HEADER_HEIGHT,
    desktopHeight: DESKTOP_HEADER_HEIGHT,
    widescreenHeight: TV_HEADER_HEIGHT,
  };

  switch (true) {
    case isTablet:
      return headerHeight.tabletHeight;
    case isDesktop:
      return headerHeight.desktopHeight;
    case isTV:
      return headerHeight.widescreenHeight;
    default:
      return headerHeight.mobileHeight;
  }
};

export default getHeaderHeight;
