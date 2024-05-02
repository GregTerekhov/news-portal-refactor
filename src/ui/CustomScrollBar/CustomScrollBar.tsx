import React, { FC, ReactElement, ReactNode } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { areaThumbStyles, customScrollStyle } from './assistants';

interface CustomScrollProps {
  children: ReactElement | ReactNode;
  isOpen: boolean;
  orientation: 'vertical' | 'horizontal';
  className?: string;
}

const CustomScrollBar: FC<CustomScrollProps> = ({ children, isOpen, orientation, className }) => {
  return (
    isOpen && (
      <ScrollArea.Root type='auto' className={className}>
        <ScrollArea.Viewport className='h-full w-full rounded'>{children}</ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className={`rounded-full bg-dropdownBase ${customScrollStyle(orientation)}`}
          orientation={orientation}
        >
          <ScrollArea.Thumb className={areaThumbStyles(orientation)} />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner asChild className='bg-accentBase' />
      </ScrollArea.Root>
    )
  );
};

export default CustomScrollBar;
