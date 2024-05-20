import { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

import { DirectionScrollButton } from 'types';

import { useWindowWidthContext } from 'contexts';

import { getHeaderHeight } from 'helpers';
import { calculateButtonVisibility } from '../assistants';

interface IButtonVisibility {
  topVisibility: string;
  downVisibility: string;
}

const useScrollController = (direction: DirectionScrollButton) => {
  const [visibility, setVisibility] = useState<IButtonVisibility>({
    topVisibility: '',
    downVisibility: '',
  });

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

    direction === DirectionScrollButton.Up
      ? setVisibility({ topVisibility: topButtonVisibility, downVisibility: '' })
      : setVisibility({ topVisibility: '', downVisibility: bottomButtonVisibility });
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
    const topPosition =
      direction === DirectionScrollButton.Up ? 0 : document.documentElement.scrollHeight;

    window.scrollTo({
      top: topPosition,
      behavior: 'smooth',
    });
  };

  return { visibility, onHandleClick };
};

export default useScrollController;
