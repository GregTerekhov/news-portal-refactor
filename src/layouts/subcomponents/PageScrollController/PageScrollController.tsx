import React, { FC } from 'react';

import {
  ButtonType,
  DirectionScrollButton,
  IconName,
  IconSizes,
  TooltipAppearanceSide,
  TooltipSideOffset,
  type HintText,
} from 'types';

import { Hint, SvgIcon } from 'ui';

import { useScrollController } from './hooks';

interface IScrollController {
  direction: DirectionScrollButton;
  position: string;
  icon: IconName;
  classIcon?: string;
  label: HintText;
}

const PageScrollController: FC<IScrollController> = ({
  direction,
  position,
  icon,
  label,
  classIcon,
}) => {
  const { visibility, onHandleClick } = useScrollController(direction);

  const { topVisibility, downVisibility } = visibility;

  const buttonStyles = `group fixed z-30 ${topVisibility} ${downVisibility} ${position} left-20 h-16 w-16 items-center justify-center rounded-full transition-colors duration-500 hocus:border-2 hocus:border-solid hocus:border-whiteBase hocus:bg-accentBase/[.7] dark:hocus:border-whiteBase`;

  return (
    <>
      <Hint
        label={label}
        side={TooltipAppearanceSide.Right}
        sideOffset={TooltipSideOffset.Large}
        ariaLabel={`Scroll ${direction} button`}
      >
        <button
          id={direction}
          aria-label={`Page scroll controller button in direction ${direction}`}
          onClick={onHandleClick}
          type={ButtonType.Button}
          className={buttonStyles}
        >
          <SvgIcon
            svgName={icon}
            sizeKey={IconSizes.lgIcon30}
            className={`${classIcon} fill-accentBase group-hover:fill-whiteBase group-focus:fill-whiteBase`}
          />
        </button>
      </Hint>
    </>
  );
};

export default PageScrollController;
