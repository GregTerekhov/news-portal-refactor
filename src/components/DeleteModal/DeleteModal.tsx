import React, { FC } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { VariantButton } from 'types';
import { useModalStateContext } from 'contexts';

import { PrimaryButton } from 'ui';

import { getButtonId, getDynamicDescription } from './assistants';

interface DeleteModalProps {
  handleDelete:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id?: string) => Promise<void>)
    | (() => Promise<void>);
  handleClose: (e: React.MouseEvent<HTMLButtonElement>, preventDefault: boolean) => void;
  title: string;
}

const DeleteModal: FC<DeleteModalProps> = ({ handleClose, handleDelete, title }) => {
  const { isOpenModal } = useModalStateContext();

  const { cancelButtonId, deleteButtonId } = getButtonId(title);
  const dynamicDescription = getDynamicDescription(title);

  const dialogButtons = [
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => handleClose(e, true),
      id: cancelButtonId,
      label: 'Cancel',
      icon: 'reset',
    },
    {
      onClick: handleDelete,
      id: deleteButtonId,
      label: 'Delete',
      icon: 'trash',
    },
  ];

  return (
    <RemoveScroll enabled={isOpenModal}>
      <div>
        <h3 className='mb-4 text-2xl text-darkBase dark:text-whiteBase md:mb-6 md:text-4xl'>
          {title}
        </h3>
        <p className='mb-6 text-medium text-darkBase dark:text-whiteBase md:mb-10 md:text-xl'>
          {`Are you sure you want to ${dynamicDescription} news?`}
        </p>
        <ul className='max-md:space-y-4 md:flex md:items-center md:justify-between md:gap-8'>
          {Array.isArray(dialogButtons) &&
            dialogButtons.map(({ onClick, id, label, icon }) => (
              <li key={label} className='w-full'>
                <PrimaryButton
                  variant={VariantButton.Primary}
                  onHandleClick={onClick}
                  hasIcon={true}
                  id={id}
                  svgName={icon}
                  svgSize='smIcon18'
                  classNameIcon='fill-whiteBase'
                  classNameButton='md:text-xl border border-whiteBase'
                >
                  {label}
                </PrimaryButton>
              </li>
            ))}
        </ul>
      </div>
    </RemoveScroll>
  );
};

export default DeleteModal;
