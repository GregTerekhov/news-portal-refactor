import React, { FC, ReactNode, createContext, useContext, useState } from 'react';

type ReadSortProviderProps = {
  children: ReactNode;
};

type ReadSortValue = {
  sortedDates: string[];
  setSortedDates: (value: string[]) => void;
};

const ReadSortContext = createContext<ReadSortValue | undefined>(undefined);

export const ReadSortProvider: FC<ReadSortProviderProps> = ({ children }) => {
  const [sortedDates, setSortedDates] = useState<string[]>([]);

  return (
    <ReadSortContext.Provider value={{ sortedDates, setSortedDates }}>
      {children}
    </ReadSortContext.Provider>
  );
};

export const useReadSortStateContext = () => {
  const context = useContext(ReadSortContext);

  if (!context) throw new Error('useReadSortStateContext must be used within a ReadSortProvider');

  return context;
};
