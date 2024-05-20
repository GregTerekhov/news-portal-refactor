import React, { FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

import { ModalType } from 'types';

interface IModalStateContextProps {
  children: ReactNode;
}

interface IModalStateContext {
  isOpenModal: boolean;
  modalType: ModalType;
  setModalType: (value: SetStateAction<ModalType>) => void;
  setIsOpenModal: (value: SetStateAction<boolean>) => void;
}

const ModalStateContext = createContext<IModalStateContext | undefined>(undefined);

export const ModalStateProvider: FC<IModalStateContextProps> = ({ children }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.Unknown);

  return (
    <ModalStateContext.Provider value={{ isOpenModal, modalType, setModalType, setIsOpenModal }}>
      {children}
    </ModalStateContext.Provider>
  );
};

export const useModalStateContext = () => {
  const context = useContext(ModalStateContext);

  if (!context) {
    throw new Error('useModalStateContext must be used within a ModalStateProvider');
  }
  return context;
};
