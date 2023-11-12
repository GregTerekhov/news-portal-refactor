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
import { useCallback, useMemo, useState } from 'react';

export interface SelectedDate {
  beginDate: string | null;
  endDate: string | null;
}

const useCalendar = () => {
  const today = startOfToday();

  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    beginDate: null,
    endDate: null,
  });

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

  // useEffect(() => {
  //   setSelectedDate({
  //     beginDate: null,
  //     endDate: null,
  //   });
  // }, []);

  return {
    today,
    selectedDate,
    currMonth,
    firstDayOfMonth,
    daysInMonth,
    setSelectedDate,
    getPrevMonth,
    getNextMonth,
    getPrevYear,
    getNextYear,
  };
};

export default useCalendar;
