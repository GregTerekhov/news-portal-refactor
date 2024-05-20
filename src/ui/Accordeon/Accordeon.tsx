import React, { FC, ReactElement, ReactNode, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';

import { IconName, IconSizes, VariantsAccordion } from 'types';

import { SvgIcon } from '..';

import {
  accordionHeaderStyles,
  accordionTriggerIconStyles,
  accordionTriggerStyles,
} from './assistants';

interface IAccordeonProps {
  children: ReactElement | ReactNode;
  position: VariantsAccordion;
  dateSeparator?: string | undefined;
  blockDefinition?: string;
}

const Accordeon: FC<IAccordeonProps> = ({ children, dateSeparator, position, blockDefinition }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const showAccordeonPages =
    position === VariantsAccordion.Read || position === VariantsAccordion.Archive;

  const accordionHeaderClass = accordionHeaderStyles(showAccordeonPages);
  const iconClass = accordionTriggerIconStyles(isOpen);

  return (
    <Accordion.Root type='single' collapsible className='w-full'>
      <Accordion.Item
        value={showAccordeonPages ? dateSeparator || '' : blockDefinition || ''}
        className={position === VariantsAccordion.AccountSettings ? 'lg:text-2xl' : ''}
      >
        <Accordion.Header className={accordionHeaderClass}>
          <Accordion.Trigger className={accordionTriggerStyles} onClick={handleClick}>
            {showAccordeonPages ? dateSeparator : blockDefinition}
            <SvgIcon svgName={IconName.Arrow} sizeKey={IconSizes.smIcon18} className={iconClass} />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className={isOpen ? 'animate-accordion-down' : 'animate-accordion-up'}>
          {children}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
export default Accordeon;
