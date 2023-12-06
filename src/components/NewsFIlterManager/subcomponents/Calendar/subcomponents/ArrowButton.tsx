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
        svgName='icon-arrow-left'
        size={24}
        className={`${iconClass} fill-accentBase dark:fill-greyIcon dark:hover:fill-accentBase`}
      />
      {children && <span className='sr-only'>{children}</span>}
    </button>
  );
};

export default ArrowButton;
