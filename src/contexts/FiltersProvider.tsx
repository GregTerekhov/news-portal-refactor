import React, { FC, ReactNode, createContext, useContext, useState } from 'react';

import type { Filters } from 'types';

type FiltersProviderProps = {
  children: ReactNode;
};
type FiltersContextValue = {
  filters: Filters;
  setFilters: (value: Filters) => void;
  selectedMaterialType: string;
  setSelectedMaterialType: (value: string) => void;
  resetFiltersState: () => void;
};

export const FiltersContext = createContext<FiltersContextValue | undefined>(undefined);

export const FiltersProvider: FC<FiltersProviderProps> = ({ children }) => {
  const [selectedMaterialType, setSelectedMaterialType] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    title: '',
    author: '',
    publisher: '',
    materialType: selectedMaterialType,
    selectedFilterDate: {
      startDate: '',
      endDate: '',
    },
  });

  const resetFiltersState = (): void => {
    setFilters({
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
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
        selectedMaterialType,
        setSelectedMaterialType,
        resetFiltersState,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersStateContext = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error('useFiltersStateContext must be used within a FiltersProvider');
  }
  return context;
};
