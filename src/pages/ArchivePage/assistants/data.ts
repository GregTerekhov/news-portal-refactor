import { ButtonType, IconName } from 'types';

enum TableLabel {
  Title = 'Title',
  Category = 'Category',
  AdditionDate = 'Addition Date',
  DeletionDate = 'Deletion Date',
}

type TableHeads = {
  label: TableLabel;
};

interface ButtonsData {
  type: ButtonType;
  iconName: IconName;
  label: string;
  disabled: boolean;
}

export const tableHeads: TableHeads[] = [
  {
    label: TableLabel.Title,
  },
  {
    label: TableLabel.Category,
  },
  {
    label: TableLabel.AdditionDate,
  },
  {
    label: TableLabel.DeletionDate,
  },
];

export const getButtonsData = (
  isDisabledUpdateButton: boolean,
  isDisabledClearButton: boolean,
): ButtonsData[] => {
  return [
    {
      type: ButtonType.Submit,
      iconName: IconName.Reset,
      label: 'Update log',
      disabled: isDisabledUpdateButton,
    },
    {
      type: ButtonType.Button,
      iconName: IconName.Trash,
      label: 'Clear log',
      disabled: isDisabledClearButton,
    },
  ];
};
