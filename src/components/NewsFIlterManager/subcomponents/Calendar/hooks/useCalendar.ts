import { useCallback, useMemo, useState } from 'react';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  parse,
  startOfToday,
  startOfWeek,
} from 'date-fns';

const useCalendar = () => {
  const today = startOfToday();

  const [currMonth, setCurrMonth] = useState(() => format(today, 'MMM-yyyy'));

  const firstDayOfMonth = useMemo(() => parse(currMonth, 'MMM-yyyy', new Date()), [currMonth]);

  const daysInMonth = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(firstDayOfMonth),
      end: endOfWeek(endOfMonth(firstDayOfMonth)),
    });
  }, [firstDayOfMonth]);

  const getPrevMonth = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
      setCurrMonth(format(firstDayOfPrevMonth, 'MMM-yyyy'));
    },
    [firstDayOfMonth],
  );

  const getNextMonth = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
      setCurrMonth(format(firstDayOfNextMonth, 'MMM-yyyy'));
    },
    [firstDayOfMonth],
  );

  const getPrevYear = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const firstDayOfPrevYear = add(firstDayOfMonth, { years: -1 });
      setCurrMonth(format(firstDayOfPrevYear, 'MMM-yyyy'));
    },
    [firstDayOfMonth],
  );

  const getNextYear = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const firstDayOfNextYear = add(firstDayOfMonth, { years: 1 });
      setCurrMonth(format(firstDayOfNextYear, 'MMM-yyyy'));
    },
    [firstDayOfMonth],
  );

  return {
    today,
    currMonth,
    firstDayOfMonth,
    daysInMonth,
    getPrevMonth,
    getNextMonth,
    getPrevYear,
    getNextYear,
  };
};

export default useCalendar;
