import React, { FC, ReactNode, createContext, useContext, useMemo, useState } from 'react';

import type { DateRequest } from 'types';

type SelectedDateContextProps = {
  children: ReactNode;
};

type SelectedDateContextValue = {
  beginRequestDate: Date | null;
  beginFilterDate: Date | null;
  memoizedSelectedRequestDate: DateRequest;
  memoizedSelectedFilterDate: DateRequest;
  setSelectedFilterDate: (date: DateRequest) => void;
  setSelectedRequestDate: (date: DateRequest) => void;
  setBeginRequestDate: (value: Date | null) => void;
  setBeginFilterDate: (value: Date | null) => void;
  resetFiltersDay: () => void;
  resetRequestDay: () => void;
};

export const SelectedDateContext = createContext<SelectedDateContextValue | undefined>(undefined);

export const SelectedDateProvider: FC<SelectedDateContextProps> = ({ children }) => {
  const [selectedRequestDate, setSelectedRequestDate] = useState<DateRequest>({
    beginDate: '',
    endDate: '',
  });
  const [selectedFilterDate, setSelectedFilterDate] = useState<DateRequest>({
    beginDate: '',
    endDate: '',
  });
  const [beginRequestDate, setBeginRequestDate] = useState<Date | null>(null);
  const [beginFilterDate, setBeginFilterDate] = useState<Date | null>(null);

  //Скидування значень дат для запиту
  const resetRequestDay = (): void => {
    setSelectedRequestDate({ beginDate: '', endDate: '' });
  };
  //Скидування значень дат для фільтрації
  const resetFiltersDay = (): void => {
    setSelectedFilterDate({ beginDate: '', endDate: '' });
  };

  //Мемоїзація значення глобального стану дати запита
  const memoizedSelectedRequestDate: DateRequest = useMemo(
    () => selectedRequestDate,
    [selectedRequestDate, resetRequestDay],
  );

  //Мемоїзація значення глобального стану дати фільтрації
  const memoizedSelectedFilterDate: DateRequest = useMemo(
    () => selectedFilterDate,
    [selectedFilterDate, resetFiltersDay],
  );

  return (
    <SelectedDateContext.Provider
      value={{
        setSelectedRequestDate,
        setSelectedFilterDate,
        memoizedSelectedRequestDate,
        memoizedSelectedFilterDate,
        beginRequestDate,
        beginFilterDate,
        setBeginRequestDate,
        setBeginFilterDate,
        resetRequestDay,
        resetFiltersDay,
      }}
    >
      {children}
    </SelectedDateContext.Provider>
  );
};

export const useSelectedDateContext = () => {
  const context = useContext(SelectedDateContext);
  if (!context) {
    throw new Error('useSelectedDateContext must be used within a SelectedDateProvider');
  }
  return context;
};
