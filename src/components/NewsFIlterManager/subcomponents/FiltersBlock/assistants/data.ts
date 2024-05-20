import {
  IconName,
  IconSizes,
  InputName,
  ButtonType,
  VariantButton,
  VariantsPlaceholder,
  SortDirection,
  PrimaryButtonId,
  type IFilterButtons,
  type Filters,
} from 'types';

type ButtonsDataProps = {
  handleFiltration: (event: React.FormEvent<Element>) => Promise<void>;
  hasFilterValue: boolean | undefined;
  isReadActive: boolean;
  isSorted: boolean;
  handleSortAccordion: (order: SortDirection) => Promise<void>;
  handleSortNews: (order: SortDirection) => void;
  handleResetFiltration: () => Promise<void>;
  isWideScreens: boolean;
};

interface FilterInputs {
  name: InputName;
  value: string;
  placeholder: VariantsPlaceholder;
}

export const getControlButtons = ({
  handleFiltration,
  hasFilterValue,
  isReadActive,
  isSorted,
  handleSortAccordion,
  handleSortNews,
  handleResetFiltration,
  isWideScreens,
}: ButtonsDataProps): IFilterButtons[] => {
  //Data для кнопок блока фільтрації новин
  return [
    {
      type: ButtonType.Submit,
      id: PrimaryButtonId.FilteringApply,
      variant: VariantButton.Primary,
      onHandleClick: handleFiltration,
      classNameButtons: 'lg:text-xl',
      hasIcon: false,
      children: 'Apply',
      disabled: !hasFilterValue ?? false,
    },
    {
      type: ButtonType.Button,
      variant: VariantButton.Small,
      onHandleClick: () =>
        isReadActive
          ? handleSortAccordion(SortDirection.Ascending)
          : handleSortNews(SortDirection.Ascending),
      ariaLabel: 'Ascending sort button',
      classNameButtons:
        'group border-whiteBase bg-accentBase hocus:bg-whiteBase dark:bg-transparent p-2 lg:w-12 lg:h-12 hocus:border-accentBase dark:hocus:bg-accentAlt dark:hocus:border-whiteBase ring-whiteBase dark:ring-darkBase ring-2 dark:border-greyBase',
      hasIcon: true,
      svgName: IconName.DateSort,
      svgSize: isWideScreens ? IconSizes.mdIcon24 : IconSizes.smIcon20,
      classNameIcon:
        'fill-whiteBase group-hover:fill-accentBase  group-focus:fill-accentBase dark:group-hover:fill-whiteBase dark:group-focus:fill-whiteBase',
    },
    {
      type: ButtonType.Reset,
      id: PrimaryButtonId.FilteringReset,
      variant: VariantButton.Primary,
      onHandleClick: handleResetFiltration,
      hasIcon: true,
      svgName: IconName.Reset,
      svgSize: IconSizes.xsIcon16,
      classNameIcon: 'fill-whiteBase',
      children: 'Reset',
      disabled: (!hasFilterValue && !isSorted) ?? false,
    },
    {
      type: ButtonType.Button,
      variant: VariantButton.Small,
      onHandleClick: () =>
        isReadActive
          ? handleSortAccordion(SortDirection.Descending)
          : handleSortNews(SortDirection.Descending),
      ariaLabel: 'Descending sort button',
      classNameButtons:
        'group p-2 border-whiteBase bg-accentBase hocus:bg-whiteBase dark:bg-transparent lg:w-12 lg:h-12 hocus:border-accentBase dark:hocus:bg-accentAlt dark:hocus:border-whiteBase ring-whiteBase dark:ring-darkBase ring-2 dark:border-greyBase',
      hasIcon: true,
      svgName: IconName.DateSort,
      svgSize: isWideScreens ? IconSizes.mdIcon24 : IconSizes.smIcon20,
      classNameIcon:
        'fill-whiteBase rotate-180 group-hover:fill-accentBase dark:group-hover:fill-whiteBase group-focus:fill-accentBase dark:group-focus:fill-whiteBase',
    },
  ];
};

export const getInputsData = (filters: Filters): FilterInputs[] => {
  return [
    {
      name: InputName.Keyword,
      value: filters.keyword,
      placeholder: VariantsPlaceholder.FilterByKeyword,
    },
    {
      name: InputName.Author,
      value: filters.author,
      placeholder: VariantsPlaceholder.FilterByAuthor,
    },
    {
      name: InputName.Title,
      value: filters.title,
      placeholder: VariantsPlaceholder.FilterByTitle,
    },
    {
      name: InputName.Publisher,
      value: filters.publisher,
      placeholder: VariantsPlaceholder.FilterByPublisher,
    },
  ];
};
