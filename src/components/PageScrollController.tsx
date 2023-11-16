import React, { useEffect, useState } from 'react';

import { useWindowWidth } from 'hooks';

import { SvgIcon } from 'ui';

interface ScrollDirection {
  direction: string;
  position: string;
  icon: string;
  dataTooltipTarget: string;
}

const PageScrollController = (value: ScrollDirection) => {
  const [upButtonVisibility, setUpButtonVisibility] = useState<string>('');
  const [downButtonVisibility, setDownButtonVisibility] = useState<string>('');
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const { direction, position, icon, dataTooltipTarget } = value;

  const headerHeight = getHeaderHeight();

  const callScroll = () => {
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
  };

  useEffect(() => {
    callScroll();

    window.addEventListener('scroll', callScroll);

    return () => {
      window.removeEventListener('scroll', callScroll);
    };
  }, [direction]);

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

  return (
    <>
      <button
        id='top'
        aria-label={`Page scroll controller button in direction ${direction}`}
        onClick={onHandleClick}
        type='button'
        className={`z-30 group fixed ${upButtonVisibility} ${downButtonVisibility} ${position} left-20 items-center justify-center w-16 h-16 hover:border-solid hover:border-2 hover:border-whiteBase dark:hover:border-whiteBase rounded-full hover:bg-accentBase/[.7] transition-colors duration-500`}
        data-tooltip-target={dataTooltipTarget}
        data-tooltip-placement='right'
      >
        <SvgIcon svgName={icon} size={30} className='fill-accentBase group-hover:fill-whiteBase' />
      </button>
      <div
        id={dataTooltipTarget}
        role='tooltip'
        className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-whiteBase bg-accentBase/[.9] rounded-lg shadow-sm opacity-0 tooltip'
      >
        {direction === 'top' && dataTooltipTarget === 'tooltip-scroll-up'
          ? 'Scroll Up'
          : 'Scroll Down'}
        <div className='tooltip-arrow' data-popper-arrow></div>
      </div>
    </>
  );
};

export default PageScrollController;
