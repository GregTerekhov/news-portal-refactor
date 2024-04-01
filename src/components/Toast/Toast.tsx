import React, { FC } from 'react';

import type { ToastStatus, ToastVariant } from 'types';
import { useNotificationContext } from 'contexts';

import { useActiveLinks } from 'hooks';

import { Notification } from 'ui';

import { useToastError, useToastInfo, useToastSuccess } from './hooks';

interface ToastSuccessProps {
  variant: ToastVariant;
  status: ToastStatus;
}

const Toast: FC<ToastSuccessProps> = ({ variant, status }) => {
  const { openToast, setOpenToast } = useNotificationContext();

  const { showSuccessToast } = useToastSuccess();
  const { showErrorToast } = useToastError();
  const { chooseInfoToastText } = useToastInfo();

  const activeLinks = useActiveLinks();
  const showInfoToast = chooseInfoToastText(activeLinks);

  //Функція виведення заголовка тоста
  const getToastTitle = (status: ToastStatus): string => {
    switch (status) {
      case 'success':
        return showSuccessToast().title;
      case 'error':
        return showErrorToast().title;
      default:
        return showInfoToast.title;
    }
  };

  //Функція виведення опису тоста
  const getToastDescription = (status: ToastStatus): string => {
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
