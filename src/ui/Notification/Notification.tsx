import React, { FC } from 'react';
import * as Toast from '@radix-ui/react-toast';

import type { ToastDescription, ToastTitle } from 'types';
import { notificationStyles } from './assistants';

interface ToastProps {
  variant?: string;
  title: ToastTitle;
  description: ToastDescription;
  openToast: boolean;
  setOpenToast: (value: boolean) => void;
}

const Notification: FC<ToastProps> = ({ variant, title, description, openToast, setOpenToast }) => {
  const { root, itemDescription, itemTitle, undoButton, viewport } = notificationStyles;

  return (
    <>
      <Toast.Root
        type={variant === 'non-interactive' ? 'background' : 'foreground'}
        open={openToast}
        defaultOpen={variant === 'non-interactive' ? true : false}
        onOpenChange={(isOpen) => setOpenToast(isOpen)}
        className={root}
      >
        <Toast.Title className={itemTitle}>{title}</Toast.Title>
        <Toast.Description className={itemDescription}>{description}</Toast.Description>
        <Toast.Action className='[grid-area:_action]' asChild altText='Goto schedule to undo'>
          <button className={undoButton}>Undo</button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className={viewport} />
    </>
  );
};

export default Notification;
