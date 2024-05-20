import React, { FC } from 'react';

import { ButtonType, IconName, IconSizes } from 'types';

import { SvgIcon } from 'ui';

interface IArrowButtonProps {
  ariaLabel: string;
  iconClass: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ArrowButton: FC<IArrowButtonProps> = ({ ariaLabel, onClick, iconClass }) => {
  return (
    <button aria-label={ariaLabel} type={ButtonType.Button} onClick={onClick}>
      <SvgIcon
        svgName={IconName.Arrow}
        sizeKey={IconSizes.xsIcon15}
        className={`${iconClass} fill-accentBase dark:fill-disabledBase dark:hocus:fill-accentBase`}
      />
      {ariaLabel && <span className='sr-only'>{ariaLabel}</span>}
    </button>
  );
};

export default ArrowButton;
