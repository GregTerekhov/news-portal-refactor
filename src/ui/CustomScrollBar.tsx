import * as ScrollArea from '@radix-ui/react-scroll-area';
import React, { FC, ReactElement, ReactNode } from 'react';

type CustomScrollProps = {
  children: ReactElement | ReactNode;
  isOpen: boolean;
  orientation: 'vertical' | 'horizontal';
  className?: string;
};

const CustomScrollBar: FC<CustomScrollProps> = ({ children, isOpen, orientation, className }) => {
  return (
    isOpen && (
      <ScrollArea.Root type='auto' className={`${className}`}>
        <ScrollArea.Viewport className='h-full w-full rounded'>{children}</ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className='customScrollPosition inline-block max-h-customScrollHeight rounded-full bg-dropdownBase data-[orientation=vertical]:w-2.5'
          orientation={orientation}
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-accentBase before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-11 before:w-full before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className='bg-accentBase' />
      </ScrollArea.Root>
    )
  );
};

export default CustomScrollBar;
