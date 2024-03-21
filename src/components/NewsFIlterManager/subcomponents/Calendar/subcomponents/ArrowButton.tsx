import React, { FC, ReactNode } from 'react';

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
        sizeKey='xsIcon15'
        className={`${iconClass} dark:hocus:fill-accentBase fill-accentBase dark:fill-disabledBase`}
      />
      {children && <span className='sr-only'>{children}</span>}
    </button>
  );
};

export default ArrowButton;
