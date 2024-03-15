import { VariantButton } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';

import type { IControlButtons } from '../types';

type ButtonsDataProps = {
  handleFiltration: (event: React.FormEvent<Element>) => Promise<void>;
  hasFilterValue: boolean | undefined;
  shouldSortAccordeon: boolean;
  handleSortRead: (order: string) => Promise<void>;
  handleSort: (order: string) => void;
  handleReset: () => Promise<void>;
  wideScreens: boolean;
};

export const getControlButtons = ({
  handleFiltration,
  hasFilterValue,
  shouldSortAccordeon,
  handleSortRead,
  handleSort,
  handleReset,
  wideScreens,
}: ButtonsDataProps) => {
  const controlButtons: IControlButtons[] = [
    {
      type: 'submit',
      id: 'Filters submit button',
      variant: VariantButton.Primary,
      onHandleClick: handleFiltration,
      classNameButtons: 'lg:text-xl',
      hasIcon: false,
      svgName: '',
      svgSize: 0,
      children: 'Apply',
      disabled: !hasFilterValue ? true : false,
    },
    {
      type: 'button',
      variant: VariantButton.Small,
      onHandleClick: () => {
        if (shouldSortAccordeon) {
          handleSortRead('asc');
        } else {
          handleSort('asc');
        }
      },
      ariaLabel: 'Ascending sort button',
      classNameButtons:
        'border-whiteBase bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors duration-500 p-2 lg:w-12 lg:h-12',
      hasIcon: true,
      svgName: 'dateSort',
      svgSize: wideScreens ? ICON_SIZES.mdIcon24 : ICON_SIZES.smIcon20,
      classNameIcon: 'fill-whiteBase',
    },
    {
      type: 'reset',
      id: 'Filters reset button',
      variant: VariantButton.Primary,
      onHandleClick: handleReset,
      classNameButtons: '',
      hasIcon: true,
      svgName: 'reset',
      svgSize: ICON_SIZES.xsIcon16,
      classNameIcon: 'fill-whiteBase',
      children: 'Reset',
    },
    {
      type: 'button',
      variant: VariantButton.Small,
      onHandleClick: () => {
        if (shouldSortAccordeon) {
          handleSortRead('desc');
        } else {
          handleSort('desc');
        }
      },
      ariaLabel: 'Descending sort button',
      classNameButtons:
        'p-2 border-whiteBase bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors duration-500 lg:w-12 lg:h-12',
      hasIcon: true,
      svgName: 'dateSort',
      svgSize: wideScreens ? ICON_SIZES.mdIcon24 : ICON_SIZES.smIcon20,
      classNameIcon: 'fill-whiteBase rotate-180',
    },
  ];

  return controlButtons;
};
