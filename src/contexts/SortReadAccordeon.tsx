import React, { FC, ReactNode, createContext, useContext, useState } from 'react';

type ReadSortProviderProps = {
  children: ReactNode;
};

type ReadSortValue = {
  sortedDates: string[] | undefined;
  setSortedDates: (value: string[]) => void;
};

export const ReadSortContext = createContext<ReadSortValue | undefined>(undefined);

export const ReadSortProvider: FC<ReadSortProviderProps> = ({ children }) => {
  const [sortedDates, setSortedDates] = useState<string[] | undefined>(undefined);

  return (
    <ReadSortContext.Provider value={{ sortedDates, setSortedDates }}>
      {children}
    </ReadSortContext.Provider>
  );
};

export const useReadSortState = () => {
  const context = useContext(ReadSortContext);

  if (!context) throw new Error('useReadSortState must be used within a FiltersProvider');

  return context;
};
