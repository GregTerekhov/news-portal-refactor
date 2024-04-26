import React, { FC, ReactElement, ReactNode } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

type CustomScrollProps = {
  children: ReactElement | ReactNode;
  isOpen: boolean;
  orientation: 'vertical' | 'horizontal';
  className?: string;
};

const CustomScrollBar: FC<CustomScrollProps> = ({ children, isOpen, orientation, className }) => {
  const archiveScroll = 'customHorizontalScrollPosition data-[orientation=horizontal]:h-2.5';
  const dropdownScroll =
    'customVerticalScrollPosition max-h-customScrollHeight data-[orientation=vertical]:w-2.5';

  const customScrollStyle: string = orientation === 'vertical' ? dropdownScroll : archiveScroll;
  const customScrollThumb: string =
    orientation === 'vertical'
      ? 'before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2'
      : 'before:!h-2.5';

  const areaThumbStyles = `${customScrollThumb} relative flex flex-1 before:rounded-[10px] before:absolute before:h-full before:w-full before:bg-accentBase before:content-['']`;

  return (
    isOpen && (
      <ScrollArea.Root type='auto' className={className}>
        <ScrollArea.Viewport className='h-full w-full rounded'>{children}</ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className={`rounded-full bg-dropdownBase ${customScrollStyle}`}
          orientation={orientation}
        >
          <ScrollArea.Thumb className={areaThumbStyles} />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner asChild className='bg-accentBase' />
      </ScrollArea.Root>
    )
  );
};

export default CustomScrollBar;
