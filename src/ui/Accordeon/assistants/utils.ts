export const accordionHeaderStyles = (showAccordeonPages: boolean): string =>
  `border-b border-solid border-lineAlt ${showAccordeonPages ? 'mb-7 md:mb-[30px] lg:mb-10' : ''}`;

export const accordionTriggerStyles =
  'flex w-full items-center gap-1.5 py-3 leading-moreRelaxed tracking-wider text-darkBase dark:text-whiteBase md:gap-2 lg:text-xl hg:text-2xl';

export const accordionTriggerIconStyles = (isOpen: boolean): string =>
  `fill-darkBase dark:fill-whiteBase ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`;
