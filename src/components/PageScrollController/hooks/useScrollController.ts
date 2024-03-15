import { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

import { useWindowWidth } from 'contexts';
import useHeaderHeight from 'hooks/useHeaderHeight';

const DOWN_MEASURE_BUTTON_VISIBILITY = 48;
const DOWN_MEASURE_BUTTON_INVISIBILITY = 112;

const useScrollController = (direction: string) => {
  const [upButtonVisibility, setUpButtonVisibility] = useState<string>('');
  const [downButtonVisibility, setDownButtonVisibility] = useState<string>('');

  const { isTablet, isDesktop, isTV } = useWindowWidth();
  const { getHeaderHeight } = useHeaderHeight();

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

  return { upButtonVisibility, downButtonVisibility, onHandleClick };
};

export default useScrollController;
