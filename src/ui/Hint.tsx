import React, { FC, ReactNode, forwardRef } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface ITooltipProps {
  children: ReactNode;
  label: string;
  contentClass: string;
  ariaLabel: string;
  side: 'top' | 'right' | 'bottom' | 'left';
  sideOffset: number;
}

const Hint: FC<ITooltipProps> = forwardRef<HTMLDivElement, ITooltipProps>(
  ({ children, label, contentClass, ariaLabel, side, sideOffset }, forwardedRef) => {
    return (
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Content
          className={`z-40 ${contentClass}`}
          side={side}
          aria-label={ariaLabel}
          sideOffset={sideOffset}
          ref={forwardedRef as React.RefObject<HTMLDivElement>}
        >
          {label}
        </Tooltip.Content>
      </Tooltip.Root>
    );
  },
);

export default Hint;
