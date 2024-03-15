import { useWindowWidth } from 'contexts';

const MOBILE_HEADER_HEIGHT = 81;
const TABLET_HEADER_HEIGHT = 106;
const DESKTOP_HEADER_HEIGHT = 113;
const TV_HEADER_HEIGHT = 136;

const useHeaderHeight = () => {
  const { isTablet, isDesktop, isTV } = useWindowWidth();

  function getHeaderHeight() {
    switch (true) {
      case isTablet:
        return TABLET_HEADER_HEIGHT;
      case isDesktop:
        return DESKTOP_HEADER_HEIGHT;
      case isTV:
        return TV_HEADER_HEIGHT;
      default:
        return MOBILE_HEADER_HEIGHT;
    }
  }

  return { getHeaderHeight };
};

export default useHeaderHeight;
