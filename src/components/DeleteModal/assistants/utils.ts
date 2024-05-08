interface IdButton {
  cancelButtonId: string;
  deleteButtonId: string;
}

export const getButtonId = (title: string): IdButton => {
  let cancelButtonId = '';
  let deleteButtonId = '';

  switch (title) {
    case 'Delete news':
      cancelButtonId = 'Cancel deletion the news';
      deleteButtonId = 'Delete selected news';
      break;
    case 'Clear log':
      cancelButtonId = 'Cancel clearing log';
      deleteButtonId = 'Clear deleted news log';
      break;

    default:
      break;
  }

  return { cancelButtonId, deleteButtonId };
};

export const getDynamicDescription = (title: string): string => {
  switch (title) {
    case 'Delete news':
      return 'delete this';
    case 'Clear log':
      return 'clear the log of deleted';

    default:
      return '';
  }
};
