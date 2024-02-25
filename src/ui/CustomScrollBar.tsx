import React, { FC, ReactElement, ReactNode } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

type CustomScrollProps = {
  children: ReactElement | ReactNode;
  isOpen: boolean;
  orientation: 'vertical' | 'horizontal';
  className?: string;
};

const CustomScrollBar: FC<CustomScrollProps> = ({ children, isOpen, orientation, className }) => {
  const archiveScroll = 'data-[orientation=horizontal]:h-2.5';
  const dropdownScroll =
    'customScrollPosition max-h-customScrollHeight data-[orientation=vertical]:w-2.5';

  const defineScrollDirection = orientation === 'vertical' ? true : false;

  const customScrollStyle: string = defineScrollDirection ? dropdownScroll : archiveScroll;
  const customScrollThumb: string = defineScrollDirection ? '' : 'h-[10px]';

  return (
    isOpen && (
      <ScrollArea.Root type='auto' className={className}>
        <ScrollArea.Viewport className='h-full w-full rounded'>{children}</ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className={`rounded-full bg-dropdownBase ${customScrollStyle}`}
          orientation={orientation}
        >
          <ScrollArea.Thumb
            className={`relative flex-1 rounded-[10px] bg-accentBase before:absolute before:left-1/2 before:top-1/2 before:h-full before:w-full ${customScrollThumb} before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']`}
          />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className='bg-accentBase' />
      </ScrollArea.Root>
    )
  );
};

export default CustomScrollBar;
