import { DeleteModalTitle } from 'types';

export const getDynamicDescription = (title: DeleteModalTitle): string => {
  switch (title) {
    case DeleteModalTitle.Delete:
      return 'delete this';
    case DeleteModalTitle.Clear:
      return 'clear the log of deleted';

    default:
      return '';
  }
};
