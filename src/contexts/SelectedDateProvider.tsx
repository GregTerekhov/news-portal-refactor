import React, { FC, ReactNode, createContext, useContext, useMemo, useState } from 'react';
export interface SelectedDate {
  beginDate: string | null;
  endDate: string | null;
}

type SelectedDateContextProps = {
  children: ReactNode;
};

type SelectedDateContextValue = {
  beginDate: Date | null;
  memoizedSelectedRequestDate: SelectedDate;
  memoizedSelectedFilterDate: SelectedDate;
  setSelectedFilterDate: (date: SelectedDate) => void;
  setSelectedRequestDate: (date: SelectedDate) => void;
  setBeginDate: (value: Date | null) => void;
  resetFiltersDay: () => void;
  resetRequestDay: () => void;
};

export const SelectedDateContext = createContext<SelectedDateContextValue | undefined>(undefined);

export const SelectedDateProvider: FC<SelectedDateContextProps> = ({ children }) => {
  const [selectedRequestDate, setSelectedRequestDate] = useState<SelectedDate>({
    beginDate: null,
    endDate: null,
  });
  const [selectedFilterDate, setSelectedFilterDate] = useState<SelectedDate>({
    beginDate: null,
    endDate: null,
  });
  const [beginDate, setBeginDate] = useState<Date | null>(null);

  //Скидування значень дат для запиту
  const resetRequestDay = (): void => {
    setSelectedRequestDate({ beginDate: null, endDate: null });
  };
  //Скидування значень дат для фільтрації
  const resetFiltersDay = (): void => {
    setSelectedFilterDate({ beginDate: null, endDate: null });
  };

  //Мемоїзація значення глобального стану дати запита
  const memoizedSelectedRequestDate = useMemo(
    (): SelectedDate => selectedRequestDate,
    [selectedRequestDate, resetRequestDay],
  );

  //Мемоїзація значення глобального стану дати фільтрації
  const memoizedSelectedFilterDate = useMemo(
    (): SelectedDate => selectedFilterDate,
    [selectedFilterDate, resetFiltersDay],
  );

  return (
    <SelectedDateContext.Provider
      value={{
        setSelectedRequestDate,
        setSelectedFilterDate,
        memoizedSelectedRequestDate,
        memoizedSelectedFilterDate,
        beginDate,
        setBeginDate,
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
