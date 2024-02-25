import React, { FC, ReactNode, createContext, useContext, useState } from 'react';
export interface SelectedDate {
  beginDate: string | null;
  endDate: string | null;
}

type SelectedDateContextProps = {
  children: ReactNode;
};

type SelectedDateContextValue = {
  selectedRequestDate: SelectedDate;
  setSelectedRequestDate: (date: SelectedDate) => void;
  beginDate: Date | null;
  setBeginDate: (value: Date | null) => void;
};

export const SelectedDateContext = createContext<SelectedDateContextValue | undefined>(undefined);

export const SelectedDateProvider: FC<SelectedDateContextProps> = ({ children }) => {
  const [selectedRequestDate, setSelectedRequestDate] = useState<SelectedDate>({
    beginDate: null,
    endDate: null,
  });
  const [beginDate, setBeginDate] = useState<Date | null>(null);

  return (
    <SelectedDateContext.Provider
      value={{
        selectedRequestDate,
        setSelectedRequestDate,
        beginDate,
        setBeginDate,
      }}
    >
      {children}
    </SelectedDateContext.Provider>
  );
};

export const useSelectedDate = () => {
  const context = useContext(SelectedDateContext);
  if (!context) {
    throw new Error('useSelectedDate must be used within a SelectedDateProvider');
  }
  return context;
};
