import React, { FC } from 'react';

import { ToastVariant } from 'types';

import { useNotification } from 'contexts';
import { useActiveLinks } from 'hooks';

import { Notification } from 'ui';

import { useToastError, useToastInfo, useToastSuccess } from './hooks';
import { useLocation } from 'react-router-dom';

interface ToastSuccessProps {
  variant: ToastVariant;
  status: 'error' | 'success' | 'info';
}

const Toast: FC<ToastSuccessProps> = ({ variant, status }) => {
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const { openToast, setOpenToast } = useNotification();
  const { showSuccessToast } = useToastSuccess();
  const { showErrorToast } = useToastError();
  const { chooseInfoToastText } = useToastInfo();

  const showInfoToast = chooseInfoToastText(activeLinks);

  return (
    <>
      <Notification
        variant={variant}
        openToast={openToast}
        setOpenToast={setOpenToast}
        title={
          status === 'success'
            ? showSuccessToast().title
            : status === 'error'
              ? showErrorToast().title
              : showInfoToast.title
        }
        description={
          status === 'success'
            ? showSuccessToast().description
            : status === 'error'
              ? showErrorToast().description
              : showInfoToast.description
        }
      />
    </>
  );
};

export default Toast;
