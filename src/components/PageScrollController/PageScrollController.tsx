import React, { FC } from 'react';

import { ICON_SIZES } from 'constants/iconSizes';

import { Hint, SvgIcon } from 'ui';

import { useScrollController } from './hooks';

interface ScrollDirection {
  direction: string;
  position: string;
  icon: string;
  classIcon?: string;
  label: string;
}

const PageScrollController: FC<ScrollDirection> = (value) => {
  const { direction, position, icon, label, classIcon } = value;

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
        contentClass='border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8] transition-colors duration-500'
      >
        <button
          id={direction}
          aria-label={`Page scroll controller button in direction ${direction}`}
          onClick={onHandleClick}
          type='button'
          className={`group fixed z-30 ${upButtonVisibility} ${downButtonVisibility} ${position} left-20 h-16 w-16 items-center justify-center rounded-full transition-colors duration-500 hover:border-2 hover:border-solid hover:border-whiteBase hover:bg-accentBase/[.7] dark:hover:border-whiteBase`}
        >
          <SvgIcon
            svgName={icon}
            size={ICON_SIZES.lgIcon30}
            className={`${classIcon} fill-accentBase group-hover:fill-whiteBase`}
          />
        </button>
      </Hint>
    </>
  );
};

export default PageScrollController;
