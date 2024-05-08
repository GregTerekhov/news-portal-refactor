export function capitalizeFirstLetter(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const calendarButtonStyles =
  'w-full bg-whiteBase dark:bg-darkBackground rounded-[20px] border border-solid border-accentBase dark:border-greyBase text-accentBase dark:text-greyAlt flex justify-between items-center py-2 px-3 group-hover:text-whiteBase group-focus:text-whiteBase group-focus:bg-accentBase group-hover:bg-accentBase group-hover:border-whiteBase group-focus:border-whiteBase transition-colors text-small md:text-base lg:text-medium leading-mediumRelaxed md:leading-moreRelaxed tracking-bigWide md:tracking-wider';

export const getWrapperClass = (isReadActive: boolean): string => {
  return `relative space-y-2 ${isReadActive ? null : 'col-span-4'}`;
};

export const getIconClass = (isOpen: boolean): string => {
  return `fill-accentBase transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`;
};
