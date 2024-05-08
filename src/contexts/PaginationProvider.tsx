import React, { ReactNode, createContext, useContext, useState } from 'react';

type PaginationContextProps = {
  children: ReactNode;
};

type PaginationContextValue = {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  resetPagination: () => void;
};

const DEFAULT_PAGE = 1;

const PaginationContext = createContext<PaginationContextValue | undefined>(undefined);

export const PaginationProvider = ({ children }: PaginationContextProps) => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

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
