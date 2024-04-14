import React, { FC } from 'react';

import type { ToastStatus, ToastVariant } from 'types';
import { useNotificationContext } from 'contexts';

import { Notification } from 'ui';

import { useToastBody } from './hooks';

interface ToastSuccessProps {
  variant: ToastVariant;
  status: ToastStatus;
}

const Toast: FC<ToastSuccessProps> = ({ variant, status }) => {
  const { openToast, setOpenToast } = useNotificationContext();
  const { getToastTitle, getToastDescription } = useToastBody();

  return (
    <>
      <Notification
        variant={variant}
        openToast={openToast}
        setOpenToast={setOpenToast}
        title={getToastTitle(status)}
        description={getToastDescription(status)}
      />
    </>
  );
};

export default Toast;
