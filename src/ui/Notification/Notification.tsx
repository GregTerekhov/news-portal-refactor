import React, { FC, SetStateAction } from 'react';
import * as Toast from '@radix-ui/react-toast';

import { ButtonType, type ToastDescription, type ToastTitle, ToastVariant } from 'types';
import { notificationStyles } from './assistants';

interface IToastProps {
  variant?: ToastVariant;
  title: ToastTitle;
  description: ToastDescription;
  openToast: boolean;
  setOpenToast: (value: SetStateAction<boolean>) => void;
}

const Notification: FC<IToastProps> = ({
  variant,
  title,
  description,
  openToast,
  setOpenToast,
}) => {
  const { root, itemDescription, itemTitle, undoButton, viewport } = notificationStyles;

  return (
    <>
      <Toast.Root
        type={variant === ToastVariant.Background ? 'background' : 'foreground'}
        open={openToast}
        defaultOpen={variant === ToastVariant.Background ? true : false}
        onOpenChange={(isOpen) => setOpenToast(isOpen)}
        className={root}
      >
        <Toast.Title className={itemTitle}>{title}</Toast.Title>
        <Toast.Description className={itemDescription}>{description}</Toast.Description>
        <Toast.Action className='[grid-area:_action]' asChild altText='Goto schedule to undo'>
          <button className={undoButton} type={ButtonType.Button}>
            Undo
          </button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className={viewport} />
    </>
  );
};

export default Notification;
