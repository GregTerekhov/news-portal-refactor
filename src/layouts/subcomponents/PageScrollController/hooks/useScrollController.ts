import { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

import { useWindowWidthContext } from 'contexts';

import { useHeaderHeight } from 'hooks';

const DOWN_MEASURE_BUTTON_VISIBILITY = 48;
const DOWN_MEASURE_BUTTON_INVISIBILITY = 112;

const useScrollController = (direction: string) => {
  const [upButtonVisibility, setUpButtonVisibility] = useState<string>('hidden');
  const [downButtonVisibility, setDownButtonVisibility] = useState<string>('hidden');

  const { isTablet, isDesktop, isTV } = useWindowWidthContext();
  const { getHeaderHeight } = useHeaderHeight();

  const headerHeight = useMemo<number>(() => getHeaderHeight(), [isDesktop, isTablet, isTV]);

  //Калькуляція та визначення позиції скролу
  const callScroll = debounce(() => {
    const currentScroll = window.scrollY;
    const screenHeight = window.innerHeight;
    const oneAndHalfScreenHeight = screenHeight * 1.5;
    const bodyHeight = document.documentElement.scrollHeight - currentScroll;
    const isTopVisible = currentScroll > screenHeight - headerHeight;
    const isBottomHide = bodyHeight < oneAndHalfScreenHeight;
    const isTopHide = currentScroll < DOWN_MEASURE_BUTTON_INVISIBILITY;
    const isTopVisibleFrontier = currentScroll > DOWN_MEASURE_BUTTON_VISIBILITY;

    if (direction === 'top') {
      setUpButtonVisibility(isTopVisible ? 'flex' : 'hidden');
    } else if (direction === 'down') {
      setDownButtonVisibility(
        isBottomHide || isTopHide ? 'hidden' : isTopVisibleFrontier ? 'flex' : 'hidden',
      );
    }
  }, 200);

  useEffect(() => {
    callScroll();

    window.addEventListener('scroll', callScroll);

    return () => {
      window.removeEventListener('scroll', callScroll);
    };
  }, [direction]);

  //Функція обробки кліку по кнопкам швидкого скролу
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
