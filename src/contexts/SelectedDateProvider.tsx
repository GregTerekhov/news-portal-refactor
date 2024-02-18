import React, { FC, ReactNode, createContext, useContext, useState } from 'react';
import { format, isAfter, startOfToday } from 'date-fns';

import { useNewsAPI, useFiltersAction } from 'reduxStore/hooks';

import { usePopUp } from 'hooks';
import { convertDateFormat } from 'helpers/dateTimeHelpers';

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

  const { fetchByDate, resetPreviousRequest, updateHeadline } = useNewsAPI();
  const { toggleCalendar } = usePopUp();
  const { filteredNews } = useFiltersAction();

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
          setSelectedRequestDate(newSelectedDate);

          const firstDate =
            newSelectedDate.beginDate && convertDateFormat(newSelectedDate.beginDate);
          const lastDate = newSelectedDate.endDate && convertDateFormat(newSelectedDate.endDate);

          updateHeadline(`News by Date: from ${firstDate} to ${lastDate}`);

          const newDateValues = Object.values(newSelectedDate);

          if (newDateValues !== null) {
            if (filteredNews && filteredNews.length > 0) {
              resetPreviousRequest();
              await fetchByDate(newSelectedDate);
              setBeginDate(null);
              toggleCalendar();
            } else {
              await fetchByDate(newSelectedDate);
              setBeginDate(null);
              toggleCalendar();
            }
          }
        } catch (error) {
          console.error('Помилка при зміні значень:', error);
        }
      }
    } else return;
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
