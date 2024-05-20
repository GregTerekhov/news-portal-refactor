import { DropdownType } from 'types';

export const buttonStyle =
  'flex w-full items-center justify-center gap-2.5 rounded-[20px] border border-solid border-accentBase bg-whiteBase py-2.5 text-small font-normal text-accentBase transition-colors group-hover:underline group-focus:underline dark:border-greyBase dark:bg-darkBackground dark:text-whiteBase lg:text-medium';

export const scrollBarStyles = (label: DropdownType): string =>
  `!absolute flex ${
    label === DropdownType.Period ? 'max-h-225px' : 'h-225px'
  } z-40 w-full overflow-hidden rounded-[20px] bg-dropdownBase py-[10px] shadow-card dark:bg-darkDropdown dark:shadow-darkCard`;

export const getMenuItemStyles = (active: boolean): string =>
  `px-3.5 text-left text-base tracking-wide text-accentBase dark:text-whiteBase lg:text-medium ${
    active ? 'underline' : ''
  }`;

export const getMenuButtonIconStyles = (open: boolean): string =>
  `fill-accentBase transition-transform dark:fill-whiteBase ${open ? 'rotate-180' : 'rotate-0'}`;

export const getLabelText = (label: DropdownType): string => {
  if (label === DropdownType.Type) {
    return `Filter by ${label}`;
  } else if (label === DropdownType.Period) {
    return `Search for popular by ${label}`;
  } else {
    return `Search by ${label}`;
  }
};

export const getItemKey = (label: DropdownType, item: string): string => {
  let key = '';

  switch (label) {
    case DropdownType.Category:
      key = 'category';
      break;
    case DropdownType.Period:
      key = 'period';
      break;

    default:
      key = item;
      break;
  }

  return key;
};
