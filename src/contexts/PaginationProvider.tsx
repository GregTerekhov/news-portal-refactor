import React, { ReactNode, createContext, useContext, useState } from 'react';

type PaginationContextProps = {
  children: ReactNode;
};

type PaginationContextValue = {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  resetPagination: () => void;
};

const PaginationContext = createContext<PaginationContextValue | undefined>(undefined);

export const PaginationProvider = ({ children }: PaginationContextProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const resetPagination = () => {
    setCurrentPage(1);
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
