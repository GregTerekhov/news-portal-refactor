import React, { FC, ReactNode, createContext, useContext, useState } from 'react';

import { useFilterCollector, useNewsAPICollector, usePopUp } from 'hooks';
import { format, isAfter, startOfToday } from 'date-fns';

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
  handleDateRequest: (date: Date) => void;
};

export const SelectedDateContext = createContext<SelectedDateContextValue | undefined>(undefined);

export const SelectedDateProvider: FC<SelectedDateContextProps> = ({ children }) => {
  const [selectedRequestDate, setSelectedRequestDate] = useState<SelectedDate>({
    beginDate: null,
    endDate: null,
  });
  const [beginDate, setBeginDate] = useState<Date | null>(null);

  const { fetchByDate, resetPreviousRequest, updateHeadline } = useNewsAPICollector();
  const { toggleCalendar } = usePopUp();
  const { filteredNews } = useFilterCollector();

  const today = startOfToday();

  const handleDateRequest = async (date: Date) => {
    if (!isAfter(date, today)) {
      if (!beginDate) {
        setBeginDate(date);
      } else {
        try {
          let newSelectedDate: { beginDate: string | null; endDate: string | null };
          if (isAfter(date, beginDate)) {
            newSelectedDate = {
              beginDate: format(beginDate, 'yyyyMMdd'),
              endDate: format(date, 'yyyyMMdd'),
            };
          } else {
            newSelectedDate = {
              beginDate: format(date, 'yyyyMMdd'),
              endDate: format(beginDate, 'yyyyMMdd'),
            };
          }

          await setSelectedRequestDate(newSelectedDate);
          updateHeadline(
            `News by Date: from ${newSelectedDate.beginDate} to ${newSelectedDate.endDate}`,
          );

          if (Object.values(newSelectedDate) !== null) {
            console.log(Object.values(newSelectedDate));
            if (filteredNews && filteredNews.length > 0) {
              resetPreviousRequest();
              await fetchByDate(newSelectedDate);
              toggleCalendar();
              setBeginDate(null);
            } else {
              toggleCalendar();
              await fetchByDate(newSelectedDate);
              setBeginDate(null);
            }
          }
        } catch (error) {
          console.error('Помилка при зміні значень:', error);
        }
      }
    }
  };
  return (
    <SelectedDateContext.Provider
      value={{
        selectedRequestDate,
        setSelectedRequestDate,
        handleDateRequest,
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
