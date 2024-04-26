import React, { FC, ReactNode, forwardRef } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface ITooltipProps {
  children: ReactNode;
  label: string;
  ariaLabel: string;
  side: 'top' | 'right' | 'bottom' | 'left';
  sideOffset: 0 | 4 | 16;
  align?: 'start' | 'center' | 'end';
}

const Hint: FC<ITooltipProps> = forwardRef<HTMLDivElement, ITooltipProps>(
  ({ children, label, ariaLabel, side, sideOffset, align = 'center' }, forwardedRef) => {
    const tooltipContentStyles =
      'z-40 rounded-xl border border-solid border-whiteBase bg-accentAlt/[.8] px-2 text-small text-whiteBase transition-colors duration-500 md:text-medium hg:text-2xl';

    return (
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={tooltipContentStyles}
            side={side}
            aria-label={ariaLabel}
            sideOffset={sideOffset}
            align={align}
            ref={forwardedRef as React.RefObject<HTMLDivElement>}
          >
            {label}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    );
  },
);

export default Hint;
