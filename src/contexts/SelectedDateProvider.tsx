import React, {
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { DateRequest } from 'types';

interface ISelectedDateContextProps {
  children: ReactNode;
}

interface ISelectedDateContext {
  beginRequestDate: Date | null;
  beginFilterDate: Date | null;
  memoizedSelectedRequestDate: DateRequest;
  memoizedSelectedFilterDate: DateRequest;
  setSelectedFilterDate: (date: SetStateAction<DateRequest>) => void;
  setSelectedRequestDate: (date: SetStateAction<DateRequest>) => void;
  setBeginRequestDate: (value: SetStateAction<Date | null>) => void;
  setBeginFilterDate: (value: SetStateAction<Date | null>) => void;
  resetFiltersDay: () => void;
  resetRequestDay: () => void;
}

const SelectedDateContext = createContext<ISelectedDateContext | undefined>(undefined);

export const SelectedDateProvider: FC<ISelectedDateContextProps> = ({ children }) => {
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
