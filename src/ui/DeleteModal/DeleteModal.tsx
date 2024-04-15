import React, { FC } from 'react';

import { VariantButton } from 'types';
import { useDBRedux } from 'reduxStore/hooks';

import { PrimaryButton } from '..';
import { getButtonsData } from './assistants';

interface DeleteModalProps {
  title: string;
  agreementText: string;
  isDeleteModal: boolean;
  newsId?: string | undefined;
  onClose: (e: React.MouseEvent<HTMLButtonElement>, preventDefault: boolean) => void;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id?: string) => Promise<void>;
}

const DeleteModal: FC<DeleteModalProps> = ({
  title,
  agreementText,
  onClose,
  onDelete,
  newsId,
  isDeleteModal,
}) => {
  const deleteItems = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { clearLog } = useDBRedux();
    if (typeof onDelete === 'function' && newsId) {
      onDelete(e, newsId);
    } else {
      clearLog();
    }
  };

  const dialogButtons = getButtonsData(onClose, deleteItems, isDeleteModal);

  return (
    <div>
      <h3 className='mb-4 text-2xl text-darkBase dark:text-whiteBase md:mb-6 md:text-4xl'>
        {title}
      </h3>
      <p className='mb-6 text-medium text-darkBase dark:text-whiteBase md:mb-10 md:text-xl'>
        {`Are you sure you want to ${agreementText}?`}
      </p>
      <ul className='max-md:space-y-4 md:flex md:items-center md:justify-between md:gap-8'>
        {dialogButtons.map(({ onClick, id, label, icon }) => (
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
  );
};

export default DeleteModal;
