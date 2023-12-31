import React, { FC, ReactElement, ReactNode, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';

import SvgIcon from './SvgIcon';

interface AccordeonProps {
  dateSeparator?: string;
  position: string;
  filtersBlock?: string;
  children: ReactElement | ReactNode;
}

const Accordeon: FC<AccordeonProps> = ({ children, dateSeparator, position, filtersBlock }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const showAccordeonPages = position === 'readPage' || position === 'archivePage';

  return (
    <Accordion.Root type='single' collapsible className='w-full'>
      <Accordion.Item
        value={showAccordeonPages ? dateSeparator || '' : filtersBlock || ''}
        className={`${position === 'accountManagePage' ? 'lg:text-2xl' : ''}`}
      >
        <Accordion.Header
          className={`border-b border-solid border-lineAlt ${
            showAccordeonPages ? 'mb-7 md:mb-[30px] lg:mb-10' : ''
          }`}
        >
          <Accordion.Trigger
            className='w-full flex py-3 items-center gap-1.5 md:gap-2 text-darkBase dark:text-whiteBase leading-moreRelaxed tracking-wider'
            onClick={handleClick}
          >
            {showAccordeonPages ? dateSeparator : filtersBlock}
            <SvgIcon
              svgName='icon-arrow-down'
              size={18}
              className={`fill-darkBase dark:fill-whiteBase ${
                isOpen ? 'rotate-180' : 'rotate-0'
              } transition-transform`}
            />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>{children}</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default Accordeon;
