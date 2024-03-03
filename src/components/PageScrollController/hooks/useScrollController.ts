import { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

import { useWindowWidth } from 'contexts';

interface ScrollControllerProps {
  direction: string;
}

const DOWN_MEASURE_BUTTON_VISIBILITY = 48;
const DOWN_MEASURE_BUTTON_INVISIBILITY = 112;
const DEFAULT_HEADER_HEIGHT = 81;
const TABLET_HEADER_HEIGHT = 106;
const DESKTOP_HEADER_HEIGHT = 113;
const TV_HEADER_HEIGHT = 136;

const useScrollController = ({ direction }: ScrollControllerProps) => {
  const [upButtonVisibility, setUpButtonVisibility] = useState<string>('');
  const [downButtonVisibility, setDownButtonVisibility] = useState<string>('');

  const { isTablet, isDesktop, isTV } = useWindowWidth();

  const headerHeight = useMemo<number>(() => getHeaderHeight(), [isDesktop, isTablet, isTV]);

  const callScroll = debounce(() => {
    const currentScroll = window.scrollY;
    const screenHeight = window.innerHeight;
    const oneAndHalfScreenHeight = screenHeight * 1.5;
    const bodyHeight = document.documentElement.scrollHeight - currentScroll;
    const topUpVisibleFrontier = currentScroll > screenHeight - headerHeight;
    const bottomDownHideFrontier = bodyHeight < oneAndHalfScreenHeight;
    const topDownHideFrontier = currentScroll < DOWN_MEASURE_BUTTON_INVISIBILITY;
    const topDownVisibleFrontier = currentScroll > DOWN_MEASURE_BUTTON_VISIBILITY;

    if (direction === 'top') {
      if (topUpVisibleFrontier) {
        setUpButtonVisibility('flex');
      } else {
        setUpButtonVisibility('hidden');
      }
    } else if (direction === 'down') {
      if (bottomDownHideFrontier || topDownHideFrontier) {
        setDownButtonVisibility('hidden');
      } else if (topDownVisibleFrontier) {
        setDownButtonVisibility('flex');
      }
    }
  }, 200);

  useEffect(() => {
    callScroll();

    window.addEventListener('scroll', callScroll);

    return () => {
      window.removeEventListener('scroll', callScroll);
    };
  }, [direction]);

  const onHandleClick = (): void => {
    const topPosition = direction === 'top' ? 0 : document.documentElement.scrollHeight;
    window.scrollTo({
      top: topPosition,
      behavior: 'smooth',
    });
  };

  function getHeaderHeight(): number {
    switch (true) {
      case isTablet:
        return TABLET_HEADER_HEIGHT;
      case isDesktop:
        return DESKTOP_HEADER_HEIGHT;
      case isTV:
        return TV_HEADER_HEIGHT;
      default:
        return DEFAULT_HEADER_HEIGHT;
    }
  }

  return { upButtonVisibility, downButtonVisibility, onHandleClick };
};

export default useScrollController;
