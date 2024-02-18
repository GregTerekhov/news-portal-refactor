import { VariantButton } from 'types';
import type { IControlButtons } from '../types';

type ButtonsDataProps = {
  handleFiltration: (event: React.FormEvent<Element>) => Promise<void>;
  hasFilterValue: boolean | undefined;
  shouldSortAccordeon: boolean;
  handleSortRead: (order: string) => Promise<void>;
  handleSort: (order: string) => void;
  handleReset: () => Promise<void>;
};

export const getControlButtons = ({
  handleFiltration,
  hasFilterValue,
  shouldSortAccordeon,
  handleSortRead,
  handleSort,
  handleReset,
}: ButtonsDataProps) => {
  const controlButtons: IControlButtons[] = [
    {
      type: 'submit',
      id: 'Filters submit button',
      variant: VariantButton.Primary,
      onHandleClick: handleFiltration,
      ariaLabel: '',
      classNameButtons: '',
      hasIcon: false,
      svgName: '',
      svgSize: 0,
      classNameIcon: '',
      children: 'Apply',
      disabled: !hasFilterValue ? true : false,
    },
    {
      type: 'button',
      id: '',
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
        'border-whiteBase bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors duration-500 p-2',
      hasIcon: true,
      svgName: 'icon-dateSort',
      svgSize: 20,
      classNameIcon: 'fill-whiteBase',
      children: '',
    },
    {
      type: 'reset',
      id: 'Filters reset button',
      variant: VariantButton.Primary,
      onHandleClick: handleReset,
      ariaLabel: '',
      classNameButtons: '',
      hasIcon: true,
      svgName: 'icon-reset',
      svgSize: 16,
      classNameIcon: 'fill-whiteBase',
      children: 'Reset',
    },
    {
      type: 'button',
      id: '',
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
        'p-2 border-whiteBase bg-accentBase dark:bg-transparent hover:bg-accentAlt transition-colors duration-500',
      hasIcon: true,
      svgName: 'icon-dateSort',
      svgSize: 20,
      classNameIcon: 'fill-whiteBase rotate-180',
      children: '',
    },
  ];

  return controlButtons;
};
