import React, { ReactNode, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { SvgIcon } from 'ui';

interface A {
  children: ReactNode;
  publishedDate?: string;
  position: string;
  filtersBlock?: string;
}

const Accordeon: React.FC<A> = ({ children, publishedDate, position, filtersBlock }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Accordion.Root type='single' collapsible className='w-full'>
      <Accordion.Item value={position === 'readPage' ? publishedDate || '' : filtersBlock || ''}>
        <Accordion.Header
          className={`border-b border-solid border-lineAlt ${
            position === 'readPage' ? 'mb-7 md:mb-[30px] lg:mb-10' : ''
          }`}
        >
          <Accordion.Trigger
            className='w-full flex py-3 items-center gap-1.5 md:gap-2 text-darkBase dark:text-whiteBase leading-moreRelaxed tracking-wider'
            onClick={handleClick}
          >
            {position === 'readPage' ? publishedDate : filtersBlock}
            <SvgIcon
              svgName='icon-arrow-down'
              size={18}
              className={`fill-darkBase dark:fill-whiteBase ${
                isOpen ? 'rotate-180' : 'rotate-0'
              } transition-transform`}
            ></SvgIcon>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>{children}</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default Accordeon;
