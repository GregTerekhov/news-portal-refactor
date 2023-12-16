import React, { FC, ReactNode, createContext, useContext, useState } from 'react';
import { Filters } from 'types';

type FiltersProviderProps = {
  children: ReactNode;
};

type FiltersContextValue = {
  filters: Filters;
  setFilters: (value: Filters) => void;
};

export const FiltersContext = createContext<FiltersContextValue | undefined>(undefined);

export const FiltersProvider: FC<FiltersProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    title: '',
    author: '',
    publisher: '',
    materialType: '',
    selectedFilterDate: {
      startDate: '',
      endDate: '',
    },
  });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>{children}</FiltersContext.Provider>
  );
};

export const useFiltersState = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useSelectedDate must be used within a SelectedDateProvider');
  }
  return context;
};
