import React, { FC } from 'react';

import { Hint, SvgIcon } from 'ui';

import { useScrollController } from './hooks';

interface ScrollDirection {
  direction: string;
  position: string;
  icon: string;
  classIcon?: string;
  label: string;
}

const PageScrollController: FC<ScrollDirection> = ({
  direction,
  position,
  icon,
  label,
  classIcon,
}) => {
  const { upButtonVisibility, downButtonVisibility, onHandleClick } =
    useScrollController(direction);

  const buttonStyles = `group fixed z-30 ${upButtonVisibility} ${downButtonVisibility} ${position} left-20 h-16 w-16 items-center justify-center rounded-full transition-colors duration-500 hocus:border-2 hocus:border-solid hocus:border-whiteBase hocus:bg-accentBase/[.7] dark:hocus:border-whiteBase`;

  return (
    <>
      <Hint label={label} side='right' sideOffset={16} ariaLabel={`Scroll ${position} button`}>
        <button
          id={direction}
          aria-label={`Page scroll controller button in direction ${direction}`}
          onClick={onHandleClick}
          type='button'
          className={buttonStyles}
        >
          <SvgIcon
            svgName={icon}
            sizeKey='lgIcon30'
            className={`${classIcon} fill-accentBase group-hover:fill-whiteBase group-focus:fill-whiteBase`}
          />
        </button>
      </Hint>
    </>
  );
};

export default PageScrollController;
