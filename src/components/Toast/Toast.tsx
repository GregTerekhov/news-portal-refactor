import React, { FC } from 'react';

import { ToastStatus, ToastVariant } from 'types';
import { useNotification } from 'contexts';

import { useActiveLinks } from 'hooks';

import { Notification } from 'ui';

import { useToastError, useToastInfo, useToastSuccess } from './hooks';

interface ToastSuccessProps {
  variant: ToastVariant;
  status: ToastStatus;
}

const Toast: FC<ToastSuccessProps> = ({ variant, status }) => {
  const { openToast, setOpenToast } = useNotification();

  const { showSuccessToast } = useToastSuccess();
  const { showErrorToast } = useToastError();
  const { chooseInfoToastText } = useToastInfo();

  const activeLinks = useActiveLinks();
  const showInfoToast = chooseInfoToastText(activeLinks);

  const getToastTitle = (status: ToastStatus) => {
    switch (status) {
      case 'success':
        return showSuccessToast().title;
      case 'error':
        return showErrorToast().title;
      default:
        return showInfoToast.title;
    }
  };

  const getToastDescription = (status: ToastStatus) => {
    switch (status) {
      case 'success':
        return showSuccessToast().description;
      case 'error':
        return showErrorToast().description;
      default:
        return showInfoToast.description;
    }
  };

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
