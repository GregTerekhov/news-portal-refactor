import React, { FC } from 'react';

interface ITooltipProps {
  dataTooltipTarget: string;
  direction?: string;
}

const Tooltip: FC<ITooltipProps> = ({ dataTooltipTarget, direction }) => {
  return (
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
  );
};

export default Tooltip;
