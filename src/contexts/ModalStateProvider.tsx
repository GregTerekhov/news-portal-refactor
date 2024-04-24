import React, { ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

type ModalStateContextProps = {
  children: ReactNode;
};

type ModalStateContextValue = {
  isOpenModal: boolean;
  modalType: string;
  setModalType: (value: SetStateAction<string>) => void;
  setIsOpenModal: (value: SetStateAction<boolean>) => void;
};

const ModalStateContext = createContext<ModalStateContextValue | undefined>(undefined);

export const ModalStateProvider = ({ children }: ModalStateContextProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');

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
