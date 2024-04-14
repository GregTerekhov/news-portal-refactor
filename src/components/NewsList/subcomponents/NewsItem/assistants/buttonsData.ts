export const getButtonsData = (
  handleClose: (e: React.MouseEvent<HTMLButtonElement>, preventDefault: boolean) => void,
  deleteNews: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>,
) => {
  const dialogButtons = [
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => handleClose(e, false),
      id: 'Cancel deletion the news',
      label: 'Cancel',
      icon: 'reset',
    },
    {
      onClick: deleteNews,
      id: 'Delete selected news',
      label: 'Delete',
      icon: 'trash',
    },
  ];

  return dialogButtons;
};
