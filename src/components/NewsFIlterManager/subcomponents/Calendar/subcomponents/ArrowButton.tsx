import React, { FC, ReactNode } from 'react';

import { ICON_SIZES } from 'constants/iconSizes';

import { SvgIcon } from 'ui';

interface IArrowButtonProps {
  ariaLabel: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  iconClass?: string;
}

const ArrowButton: FC<IArrowButtonProps> = ({ ariaLabel, onClick, children, iconClass }) => {
  return (
    <button aria-label={ariaLabel} type='button' onClick={onClick}>
      <SvgIcon
        svgName='arrow'
        size={ICON_SIZES.xsIcon15}
        className={`${iconClass} fill-accentBase dark:fill-disabledBase dark:hover:fill-accentBase`}
      />
      {children && <span className='sr-only'>{children}</span>}
    </button>
  );
};

export default ArrowButton;
