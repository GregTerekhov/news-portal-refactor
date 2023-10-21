import React, { useEffect, useState } from 'react';
import SvgIcon from 'ui/SvgIcon';

type ScrollDirection = {
  direction: string;
  position: string;
  icon: string;
};

const PageScrollController = (value: ScrollDirection) => {
  const [hide, setHide] = useState<string>('flex');
  const [scroll, setScroll] = useState<number>(0);

  const bodyHeight = document.documentElement.scrollHeight - window.scrollY;
  const { direction, position, icon } = value;

  document.addEventListener('scroll', () => setScroll(window.scrollY));

  useEffect(() => {
    const callScroll = async () => {
      if (direction === 'top' && window.scrollY < 250) {
        setHide('hidden');
      }
      if (direction === 'down' && bodyHeight === window.innerHeight) {
        setHide('hidden');
      }
      if (window.scrollY >= 250) {
        setHide('flex');
      }
    };

    callScroll();
  }, [scroll]);

  const onHandleClick = () => {
    if (direction === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    if (direction === 'down') {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      id='top'
      onClick={onHandleClick}
      type='button'
      className={`z-40 group fixed ${hide} ${position} left-20 items-center justify-center w-16 h-16 hover:border-solid hover:border-2 hover:border-whiteBase dark:hover:border-whiteBase hover:rounded-full hover:bg-accentForeground `}
    >
      <SvgIcon svgName={icon} size={30} className='fill-accentBase group-hover:fill-whiteBase' />
    </button>
  );
};

export default PageScrollController;
