type TableLabel = 'Title' | 'Category' | 'Addition Date' | 'Deletion Date';

type TableHeads = {
  label: TableLabel;
};

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
