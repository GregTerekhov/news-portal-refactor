import React, { FC } from 'react';

import { SvgIcon } from 'ui';

import { useScrollController } from './hooks';

interface ScrollDirection {
  direction: string;
  position: string;
  icon: string;
  dataTooltipTarget: string;
}

const PageScrollController: FC<ScrollDirection> = (value) => {
  const { direction, position, icon, dataTooltipTarget } = value;

  const { upButtonVisibility, downButtonVisibility, onHandleClick } = useScrollController({
    direction,
  });

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
