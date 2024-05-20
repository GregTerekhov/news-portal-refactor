import React, { FC, ReactElement, ReactNode } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { ScrollOrientation } from 'types';
import { areaThumbStyles, customScrollStyle } from './assistants';

interface ICustomScrollProps {
  children: ReactElement | ReactNode;
  isOpen: boolean;
  orientation: ScrollOrientation;
  className?: string;
}

const CustomScrollBar: FC<ICustomScrollProps> = ({ children, isOpen, orientation, className }) => {
  const scrollStyles = customScrollStyle(orientation);
  const thumbStyles = areaThumbStyles(orientation);

  return (
    isOpen && (
      <ScrollArea.Root type='auto' className={className}>
        <ScrollArea.Viewport className='h-full w-full rounded'>{children}</ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className={`rounded-full bg-dropdownBase ${scrollStyles}`}
          orientation={orientation}
        >
          <ScrollArea.Thumb className={thumbStyles} />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner asChild className='bg-accentBase' />
      </ScrollArea.Root>
    )
  );
};

export default CustomScrollBar;
