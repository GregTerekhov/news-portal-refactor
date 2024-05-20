import React, { FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import { RequestStatus } from 'types';

interface INotificationContextProps {
  children: ReactNode;
}

interface INotificationContext {
  openToast: boolean;
  setOpenToast: (value: SetStateAction<boolean>) => void;
  showToast: (requestStatus: RequestStatus) => void;
}

const NotificationContext = createContext<INotificationContext | undefined>(undefined);

export const NotificationProvider: FC<INotificationContextProps> = ({ children }) => {
  const [openToast, setOpenToast] = useState(false);

  //Функція показування тосту в залежності від статусу відповіді
  const showToast = (requestStatus: RequestStatus): void => {
    if (requestStatus === RequestStatus.Undefined) {
      return;
    } else {
      if (requestStatus === RequestStatus.Rejected) {
        setOpenToast(true);
        return;
      } else {
        setOpenToast(true);
      }
    }
  };

  return (
    <NotificationContext.Provider value={{ openToast, setOpenToast, showToast }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
