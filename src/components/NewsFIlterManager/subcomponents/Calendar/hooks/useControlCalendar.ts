import React, { useCallback, useMemo, useState } from 'react';
import { add, eachDayOfInterval, endOfMonth, endOfWeek, startOfToday, startOfWeek } from 'date-fns';

import { formatDateToString, parseStringToDate } from 'helpers';

const useControlCalendar = () => {
  const today = startOfToday();
  const { monthYear } = formatDateToString(today);
  const [currMonth, setCurrMonth] = useState<string>(monthYear);

  const firstDayOfMonth: Date = useMemo(() => parseStringToDate(currMonth), [currMonth]);

  const daysInMonth: Date[] = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(firstDayOfMonth),
      end: endOfWeek(endOfMonth(firstDayOfMonth)),
    });
  }, [firstDayOfMonth]);

  const handleChangeMonth = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, amount: number): void => {
      event.preventDefault();

      const newFirstDay = add(firstDayOfMonth, { months: amount });
      const { monthYear } = formatDateToString(newFirstDay);

      setCurrMonth(monthYear);
    },
    [firstDayOfMonth],
  );

  const handleChangeYear = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, amount: number) => {
      event.preventDefault();

      const newFirstDay = add(firstDayOfMonth, { years: amount });
      const { monthYear } = formatDateToString(newFirstDay);

      setCurrMonth(monthYear);
    },
    [firstDayOfMonth],
  );

  const generateKey = (date: Date): string => date.toISOString();

  return {
    currMonth,
    firstDayOfMonth,
    daysInMonth,
    handleChangeMonth,
    handleChangeYear,
    generateKey,
  };
};

export default useControlCalendar;
