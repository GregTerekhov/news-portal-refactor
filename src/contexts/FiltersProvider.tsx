import React, { FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

import type { Filters } from 'types';

interface IFiltersProviderProps {
  children: ReactNode;
}
interface IFiltersContext {
  filters: Filters;
  selectedMaterialType: string;
  setFilters: (value: SetStateAction<Filters>) => void;
  setSelectedMaterialType: (value: SetStateAction<string>) => void;
  resetFiltersState: () => void;
}

const FiltersContext = createContext<IFiltersContext | undefined>(undefined);

export const FiltersProvider: FC<IFiltersProviderProps> = ({ children }) => {
  const [selectedMaterialType, setSelectedMaterialType] = useState('');
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
        selectedMaterialType,
        setFilters,
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
