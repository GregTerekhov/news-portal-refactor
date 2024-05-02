import React, { FC, ReactElement, ReactNode, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';

import SvgIcon from '../SvgIcon/SvgIcon';
import {
  accordionHeaderStyles,
  accordionTriggerIconStyles,
  accordionTriggerStyles,
} from './assistants';

interface AccordeonProps {
  children: ReactElement | ReactNode;
  position: string;
  dateSeparator?: string | undefined;
  blockDefinition?: string;
}

const Accordeon: FC<AccordeonProps> = ({ children, dateSeparator, position, blockDefinition }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const showAccordeonPages = position === 'readPage' || position === 'archivePage';

  return (
    <Accordion.Root type='single' collapsible className='w-full'>
      <Accordion.Item
        value={showAccordeonPages ? dateSeparator || '' : blockDefinition || ''}
        className={position === 'accountManagePage' ? 'lg:text-2xl' : ''}
      >
        <Accordion.Header className={accordionHeaderStyles(showAccordeonPages)}>
          <Accordion.Trigger className={accordionTriggerStyles} onClick={handleClick}>
            {showAccordeonPages ? dateSeparator : blockDefinition}
            <SvgIcon
              svgName='arrow'
              sizeKey='smIcon18'
              className={accordionTriggerIconStyles(isOpen)}
            />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content
          className={`${isOpen ? 'animate-accordion-down' : 'animate-accordion-up'}`}
        >
          {children}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
export default Accordeon;
