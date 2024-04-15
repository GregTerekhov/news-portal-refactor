export const getButtonsData = (
  handleClose: (e: React.MouseEvent<HTMLButtonElement>, preventDefault: boolean) => void,
  deleteItems:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>)
    | (() => Promise<void>),
  isDeleteModal: boolean,
) => {
  const dialogButtons = [
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => handleClose(e, false),
      id: isDeleteModal ? 'Cancel deletion the news' : 'Cancel clearing log',
      label: 'Cancel',
      icon: 'reset',
    },
    {
      onClick: deleteItems,
      id: isDeleteModal ? 'Delete selected news' : 'Clear deleted news log',
      label: 'Delete',
      icon: 'trash',
    },
  ];

  return dialogButtons;
};
