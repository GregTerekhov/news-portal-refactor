import React, { FC } from 'react';

import { Hint, SvgIcon } from 'ui';

import { useScrollController } from './hooks';

interface ScrollDirection {
  direction: string;
  position: string;
  icon: string;
  label: string;
}

const PageScrollController: FC<ScrollDirection> = (value) => {
  const { direction, position, icon, label } = value;

  const { upButtonVisibility, downButtonVisibility, onHandleClick } = useScrollController({
    direction,
  });

  return (
    <>
      <Hint
        label={label}
        side='right'
        sideOffset={16}
        ariaLabel={`Scroll ${position} button`}
        contentClass='border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]'
      >
        <button
          id='top'
          aria-label={`Page scroll controller button in direction ${direction}`}
          onClick={onHandleClick}
          type='button'
          className={`z-30 group fixed ${upButtonVisibility} ${downButtonVisibility} ${position} left-20 items-center justify-center w-16 h-16 hover:border-solid hover:border-2 hover:border-whiteBase dark:hover:border-whiteBase rounded-full hover:bg-accentBase/[.7] transition-colors duration-500`}
        >
          <SvgIcon
            svgName={icon}
            size={30}
            className='fill-accentBase group-hover:fill-whiteBase'
          />
        </button>
      </Hint>
    </>
  );
};

export default PageScrollController;
