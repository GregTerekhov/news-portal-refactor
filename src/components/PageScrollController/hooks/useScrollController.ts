import { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

import { useWindowWidth } from 'hooks';

interface ScrollControllerProps {
  direction: string;
}

const useScrollController = ({ direction }: ScrollControllerProps) => {
  const [upButtonVisibility, setUpButtonVisibility] = useState<string>('');
  const [downButtonVisibility, setDownButtonVisibility] = useState<string>('');
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const headerHeight = useMemo<number>(() => getHeaderHeight(), [breakpointsForMarkup]);

  const callScroll = debounce(() => {
    const currentScroll = window.scrollY;
    const screenHeight = window.innerHeight;
    const oneAndHalfScreenHeight = screenHeight * 1.5;
    const bodyHeight = document.documentElement.scrollHeight - currentScroll;
    const topUpVisibleFrontier = currentScroll > screenHeight - headerHeight;
    const bottomDownHideFrontier = bodyHeight < oneAndHalfScreenHeight;
    const topDownHideFrontier = currentScroll < 112;
    const topDownVisibleFrontier = currentScroll > 48;

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

  const onHandleClick = () => {
    const topPosition = direction === 'top' ? 0 : document.documentElement.scrollHeight;
    window.scrollTo({
      top: topPosition,
      behavior: 'smooth',
    });
  };

  function getHeaderHeight() {
    let headerHeight: number = 81;
    switch (true) {
      case breakpointsForMarkup?.isTablet:
        headerHeight = 106;
        break;
      case breakpointsForMarkup?.isDesktop:
        headerHeight = 113;
        break;
      default:
        headerHeight = 81;
    }
    return headerHeight;
  }

  return { upButtonVisibility, downButtonVisibility, onHandleClick };
};

export default useScrollController;
