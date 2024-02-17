import React, { ReactNode, createContext, useContext, useState } from 'react';

type NotificationContextProps = {
  children: ReactNode;
};

type NotificationContextValue = {
  openToast: boolean;
  setOpenToast: (value: boolean) => void;
  showToast: (requestStatus: RequestStatus) => void;
};

type RequestStatus = 'fulfilled' | 'rejected';

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider = ({ children }: NotificationContextProps) => {
  const [openToast, setOpenToast] = useState<boolean>(false);

  const showToast = (requestStatus: RequestStatus) => {
    if (requestStatus === 'rejected') {
      setOpenToast(true);
      return;
    } else {
      setOpenToast(true);
    }
  };

  return (
    <NotificationContext.Provider value={{ openToast, setOpenToast, showToast }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
