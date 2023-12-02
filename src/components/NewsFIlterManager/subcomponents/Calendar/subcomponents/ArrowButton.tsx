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
        svgName='icon-arrow-right'
        size={20}
        className={`${iconClass} stroke-accentBase fill-transparent dark:stroke-greyIcon dark:hover:stroke-accentBase`}
      />
      {children && <span className='sr-only'>{children}</span>}
    </button>
  );
};

export default ArrowButton;
