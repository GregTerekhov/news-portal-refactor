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
        <ScrollArea.Viewport className='w-full h-full rounded'>{children}</ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className='inline-block max-h-customScrollHeight rounded-full bg-dropdownBase data-[orientation=vertical]:w-2.5 customScrollPosition'
          orientation={orientation}
        >
          <ScrollArea.Thumb className="flex-1 bg-accentBase rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className='bg-accentBase' />
      </ScrollArea.Root>
    )
  );
};

export default CustomScrollBar;
