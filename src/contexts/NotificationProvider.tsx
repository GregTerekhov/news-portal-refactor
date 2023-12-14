import React, { ReactNode, createContext, useContext, useState } from 'react';

type NotificationContextProps = {
  children: ReactNode;
};

type NotificationContextValue = {
  openToast: boolean;
  setOpenToast: (value: boolean) => void;
};

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider = ({ children }: NotificationContextProps) => {
  const [openToast, setOpenToast] = useState<boolean>(false);
  return (
    <NotificationContext.Provider value={{ openToast, setOpenToast }}>
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
