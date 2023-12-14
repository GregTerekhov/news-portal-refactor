import React, { FC } from 'react';

import { PrimaryButton } from 'ui';

interface DeleteNewsButtonProps {
  handleDeleteNews: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id?: string,
  ) => Promise<void>;
  newsId: string | undefined;
  handleClose: (e: React.MouseEvent<HTMLButtonElement>, preventDefault: boolean) => void;
}

const DeleteNewsModal: FC<DeleteNewsButtonProps> = ({ handleDeleteNews, handleClose, newsId }) => {
  const deleteNews = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    await handleDeleteNews(e, newsId);
    handleClose(e, false);
  };

  const dialogButtons = [
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => handleClose(e, false),
      id: 'Cancel deletion the news',
      label: 'Cancel',
    },
    {
      onClick: deleteNews,
      id: 'Delete selected news',
      label: 'Delete',
    },
  ];

  return (
    <div>
      <h3 className='text-2xl text-darkBase dark:text-whiteBase mb-4 md:text-4xl md:mb-6'>
        Delete news
      </h3>
      <p className='text-medium text-darkBase dark:text-whiteBase mb-6 md:text-xl md:mb-10'>
        Are you sure you want to delete this news?
      </p>
      <ul className='max-md:space-y-4 md:flex md:justify-between md:items-center md:gap-8'>
        {dialogButtons.map(({ onClick, id, label }) => (
          <li key={label} className='w-full'>
            <PrimaryButton
              variant='Primary'
              onHandleClick={onClick}
              id={id}
              classNameButton='md:text-xl'
            >
              {label}
            </PrimaryButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteNewsModal;
