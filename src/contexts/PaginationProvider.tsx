import React, { FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface IPaginationContextProps {
  children: ReactNode;
}

interface IPaginationContext {
  currentPage: number;
  setCurrentPage: (value: SetStateAction<number>) => void;
  resetPagination: () => void;
}

const DEFAULT_PAGE = 1;

const PaginationContext = createContext<IPaginationContext | undefined>(undefined);

export const PaginationProvider: FC<IPaginationContextProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);

  //Скидування глобального стану пагінації
  const resetPagination = (): void => {
    setCurrentPage(DEFAULT_PAGE);
  };

  return (
    <PaginationContext.Provider value={{ currentPage, setCurrentPage, resetPagination }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);

  if (!context) {
    throw new Error('usePaginationContext must be used within a PaginationProvider');
  }
  return context;
};
