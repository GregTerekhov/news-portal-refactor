import { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

import { useWindowWidthContext } from 'contexts';

import { getHeaderHeight } from 'helpers';
import { calculateButtonVisibility } from '../assistants';

const useScrollController = (direction: string) => {
  const [upButtonVisibility, setUpButtonVisibility] = useState<string>('');
  const [downButtonVisibility, setDownButtonVisibility] = useState<string>('');

  const { isTablet, isDesktop, isTV } = useWindowWidthContext();

  const headerHeight = useMemo<number>(
    () => getHeaderHeight(isTablet, isDesktop, isTV),
    [isDesktop, isTablet, isTV],
  );

  //Калькуляція та визначення позиції скролу
  const callScroll = debounce(() => {
    const currentScroll = window.scrollY;

    const { topButtonVisibility, bottomButtonVisibility } = calculateButtonVisibility(
      currentScroll,
      headerHeight,
    );

    direction === 'top'
      ? setUpButtonVisibility(topButtonVisibility)
      : setDownButtonVisibility(bottomButtonVisibility);
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
