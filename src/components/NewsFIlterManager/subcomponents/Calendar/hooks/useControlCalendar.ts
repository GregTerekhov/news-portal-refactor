import { useCallback, useMemo, useState } from 'react';
import { add, eachDayOfInterval, endOfMonth, endOfWeek, startOfToday, startOfWeek } from 'date-fns';

import { formatDateToString, parseStringToDate } from 'helpers';

const useControlCalendar = () => {
  const today = startOfToday();
  const [currMonth, setCurrMonth] = useState<string>(getCurrentMonthState());

  const firstDayOfMonth: Date = useMemo(() => parseStringToDate(currMonth), [currMonth]);

  const daysInMonth: Date[] = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(firstDayOfMonth),
      end: endOfWeek(endOfMonth(firstDayOfMonth)),
    });
  }, [firstDayOfMonth]);

  const getPrevMonth = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
      setCurrMonth(formatDateToString(firstDayOfPrevMonth).monthYear);
    },
    [firstDayOfMonth],
  );

  const getNextMonth = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
      setCurrMonth(formatDateToString(firstDayOfNextMonth).monthYear);
    },
    [firstDayOfMonth],
  );

  const getPrevYear = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      const firstDayOfPrevYear = add(firstDayOfMonth, { years: -1 });
      setCurrMonth(formatDateToString(firstDayOfPrevYear).monthYear);
    },
    [firstDayOfMonth],
  );

  const getNextYear = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      const firstDayOfNextYear = add(firstDayOfMonth, { years: 1 });
      setCurrMonth(formatDateToString(firstDayOfNextYear).monthYear);
    },
    [firstDayOfMonth],
  );

  function getCurrentMonthState(): string {
    return formatDateToString(today).monthYear;
  }

  return {
    currMonth,
    firstDayOfMonth,
    daysInMonth,
    getPrevMonth,
    getNextMonth,
    getPrevYear,
    getNextYear,
  };
};

export default useControlCalendar;
