type TableLabel = 'Title' | 'Category' | 'Addition Date' | 'Deletion Date';

type TableHeads = {
  label: TableLabel;
};

interface ButtonsData {
  type: 'submit' | 'reset' | 'button' | undefined;
  iconName: string;
  label: string;
  disabled?: boolean;
}

export const tableHeads: TableHeads[] = [
  {
    label: 'Title',
  },
  {
    label: 'Category',
  },
  {
    label: 'Addition Date',
  },
  {
    label: 'Deletion Date',
  },
];

export const getButtonsData = (isDisabledButton: boolean) => {
  const buttonData: ButtonsData[] = [
    {
      type: 'submit',
      iconName: 'reset',
      label: 'Update log',
      disabled: isDisabledButton,
    },
    {
      type: 'button',
      iconName: 'trash',
      label: 'Clear log',
    },
  ];

  return buttonData;
};
