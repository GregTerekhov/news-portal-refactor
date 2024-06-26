import React, { FC, ReactNode, createContext, useContext, useState } from 'react';

import type { SearchParamsObject } from 'types';

import { useNewsAPIRedux } from 'reduxStore/hooks';

interface IAdditionRequestContextProps {
  children: ReactNode;
}

interface IAdditionRequestContext {
  searchParams: SearchParamsObject;
  updateSearchParams: (value: string, key: keyof SearchParamsObject | string) => void;
  resetSearchParams: () => void;
  hasRequestValue: boolean;
}

const AdditionRequestContext = createContext<IAdditionRequestContext | undefined>(undefined);

export const AdditionRequestProvider: FC<IAdditionRequestContextProps> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<SearchParamsObject>({
    query: '',
    period: '',
    category: '',
  });
  const { newsByDate } = useNewsAPIRedux();

  const updateSearchParams = (value: string, key: keyof SearchParamsObject | string): void => {
    setSearchParams((prevParams: SearchParamsObject) => ({ ...prevParams, [key]: value }));
  };

  const resetSearchParams = (): void => setSearchParams({ query: '', period: '', category: '' });

  const hasRequestValue =
    Object.values(searchParams).some((value) => value !== '') || newsByDate?.length > 0;

  return (
    <AdditionRequestContext.Provider
      value={{
        searchParams,
        updateSearchParams,
        resetSearchParams,
        hasRequestValue,
      }}
    >
      {children}
    </AdditionRequestContext.Provider>
  );
};

export const useAdditionRequestContext = () => {
  const context = useContext(AdditionRequestContext);
  if (!context) {
    throw new Error('useAdditionRequestContext must be used within a AdditionRequestProvider');
  }
  return context;
};
