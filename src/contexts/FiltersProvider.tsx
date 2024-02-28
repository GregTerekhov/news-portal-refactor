import React, { FC, ReactNode, createContext, useContext, useState } from 'react';

import { Filters } from 'types';

type FiltersProviderProps = {
  children: ReactNode;
};
type FiltersContextValue = {
  filters: Filters;
  setFilters: (value: Filters) => void;
  selectedMaterialType: string;
  setSelectedMaterialType: (value: string) => void;
};

export const FiltersContext = createContext<FiltersContextValue | undefined>(undefined);

export const FiltersProvider: FC<FiltersProviderProps> = ({ children }) => {
  const [selectedMaterialType, setSelectedMaterialType] = useState<string>('');
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
    <FiltersContext.Provider
      value={{ filters, setFilters, selectedMaterialType, setSelectedMaterialType }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersState = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error('useFiltersState must be used within a FiltersProvider');
  }
  return context;
};
