import { Filters, VariantButton } from 'types';
import type { IControlButtons } from '../types';

type ButtonsDataProps = {
  handleFiltration: (event: React.FormEvent<Element>) => Promise<void>;
  hasFilterValue: boolean | undefined;
  isReadActive: boolean;
  isSorted: boolean;
  handleSortRead: (order: string) => Promise<void>;
  handleSort: (order: string) => void;
  handleResetFiltration: () => Promise<void>;
  wideScreens: boolean;
};

interface FilterInputs {
  name: string;
  value: string;
  placeholder: string;
}

export const getControlButtons = ({
  handleFiltration,
  hasFilterValue,
  isReadActive,
  isSorted,
  handleSortRead,
  handleSort,
  handleResetFiltration,
  wideScreens,
}: ButtonsDataProps) => {
  //Data для кнопок блока фільтрації новин
  const controlButtons: IControlButtons[] = [
    {
      type: 'submit',
      id: 'Filters submit button',
      variant: VariantButton.Primary,
      onHandleClick: handleFiltration,
      classNameButtons: 'lg:text-xl',
      hasIcon: false,
      svgName: '',
      children: 'Apply',
      disabled: !hasFilterValue ? true : false,
    },
    {
      type: 'button',
      variant: VariantButton.Small,
      onHandleClick: () => (isReadActive ? handleSortRead('asc') : handleSort('asc')),
      ariaLabel: 'Ascending sort button',
      classNameButtons:
        'group border-whiteBase bg-accentBase hocus:bg-whiteBase dark:bg-transparent p-2 lg:w-12 lg:h-12 hocus:border-accentBase dark:hocus:bg-accentAlt dark:hocus:border-whiteBase ring-whiteBase dark:ring-darkBase ring-2 dark:border-greyBase',
      hasIcon: true,
      svgName: 'dateSort',
      svgSize: wideScreens ? 'mdIcon24' : 'smIcon20',
      classNameIcon:
        'fill-whiteBase group-hover:fill-accentBase  group-focus:fill-accentBase dark:group-hover:fill-whiteBase dark:group-focus:fill-whiteBase',
    },
    {
      type: 'reset',
      id: 'Filters reset button',
      variant: VariantButton.Primary,
      onHandleClick: handleResetFiltration,
      hasIcon: true,
      svgName: 'reset',
      svgSize: 'xsIcon16',
      classNameIcon: 'fill-whiteBase',
      children: 'Reset',
      disabled: !hasFilterValue && !isSorted ? true : false,
    },
    {
      type: 'button',
      variant: VariantButton.Small,
      onHandleClick: () => (isReadActive ? handleSortRead('desc') : handleSort('desc')),
      ariaLabel: 'Descending sort button',
      classNameButtons:
        'group p-2 border-whiteBase bg-accentBase hocus:bg-whiteBase dark:bg-transparent lg:w-12 lg:h-12 hocus:border-accentBase dark:hocus:bg-accentAlt dark:hocus:border-whiteBase ring-whiteBase dark:ring-darkBase ring-2 dark:border-greyBase',
      hasIcon: true,
      svgName: 'dateSort',
      svgSize: wideScreens ? 'mdIcon24' : 'smIcon20',
      classNameIcon:
        'fill-whiteBase rotate-180 group-hover:fill-accentBase dark:group-hover:fill-whiteBase group-focus:fill-accentBase dark:group-focus:fill-whiteBase',
    },
  ];

  return controlButtons;
};

export const getInputsData = (filters: Filters) => {
  const filterInputs: FilterInputs[] = [
    {
      name: 'keyword',
      value: filters.keyword,
      placeholder: 'Keyword',
    },
    {
      name: 'author',
      value: filters.author,
      placeholder: 'Author',
    },
    {
      name: 'title',
      value: filters.title,
      placeholder: 'Title',
    },
    {
      name: 'publisher',
      value: filters.publisher,
      placeholder: 'Publisher',
    },
  ];

  return filterInputs;
};
