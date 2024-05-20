import React, { FC, ReactNode, createContext, useContext, useState } from 'react';

interface IReadSortProviderProps {
  children: ReactNode;
}

interface IReadSortContext {
  sortedDates: string[];
  setSortedDates: (value: string[]) => void;
}

const ReadSortContext = createContext<IReadSortContext | undefined>(undefined);

export const ReadSortProvider: FC<IReadSortProviderProps> = ({ children }) => {
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
