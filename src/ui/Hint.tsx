import React, { FC, ReactNode, forwardRef } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface ITooltipProps {
  children: ReactNode;
  label: string;
  contentClass: string;
  ariaLabel: string;
  side: 'top' | 'right' | 'bottom' | 'left';
  sideOffset: number;
  align?: 'start' | 'center' | 'end';
}

const Hint: FC<ITooltipProps> = forwardRef<HTMLDivElement, ITooltipProps>(
  (
    { children, label, contentClass, ariaLabel, side, sideOffset, align = 'center' },
    forwardedRef,
  ) => {
    return (
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={`z-40 ${contentClass}`}
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
