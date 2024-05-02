import React, { useCallback, useMemo, useState } from 'react';
import { add, eachDayOfInterval, endOfMonth, endOfWeek, startOfToday, startOfWeek } from 'date-fns';

import { formatDateToString, parseStringToDate } from 'helpers';

const useControlCalendar = () => {
  const today = startOfToday();
  const [currMonth, setCurrMonth] = useState<string>(formatDateToString(today).monthYear);

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
      setCurrMonth(formatDateToString(newFirstDay).monthYear);
    },
    [firstDayOfMonth],
  );

  const handleChangeYear = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, amount: number) => {
      event.preventDefault();
      const newFirstDay = add(firstDayOfMonth, { years: amount });
      setCurrMonth(formatDateToString(newFirstDay).monthYear);
    },
    [firstDayOfMonth],
  );

  return {
    currMonth,
    firstDayOfMonth,
    daysInMonth,
    handleChangeMonth,
    handleChangeYear,
  };
};

export default useControlCalendar;
