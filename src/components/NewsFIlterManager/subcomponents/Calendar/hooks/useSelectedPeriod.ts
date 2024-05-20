import { isSameDay, isSameMonth, isToday } from 'date-fns';

import { CalendarVariant } from 'types';

import { useSelectedDateContext } from 'contexts';

import { getStringDateToCalendar, isDayInRange, parseStringToDate } from 'helpers';

const useSelectedPeriod = (day: Date, currentMonth: string, variant: CalendarVariant) => {
  const { memoizedSelectedRequestDate, memoizedSelectedFilterDate } = useSelectedDateContext();

  const { beginDate: firstRequestDate, endDate: lastRequestDate } = memoizedSelectedRequestDate;
  const { beginDate: firstFilterDate, endDate: lastFilterDate } = memoizedSelectedFilterDate;

  const isRequestPeriod = !!firstRequestDate && !!lastRequestDate;
  const isFilterPeriod = !!firstFilterDate && !!lastFilterDate;

  const isCurrentMonth = isSameMonth(day, parseStringToDate(currentMonth));
  const isTodayDate = isToday(day);
  const evenDayToString = getStringDateToCalendar(day, variant);

  const getSelectedRange = (position: CalendarVariant): boolean => {
    return position === CalendarVariant.Filter
      ? isDayInRange(firstFilterDate, lastFilterDate, evenDayToString)
      : isDayInRange(firstRequestDate, lastRequestDate, evenDayToString);
  };

  const getParsedDate = (position: CalendarVariant): Date | 0 => {
    const requestParsingCondition =
      position === CalendarVariant.Search &&
      getSelectedRange(CalendarVariant.Search) &&
      isCurrentMonth;
    const filterParsingCondition =
      position === CalendarVariant.Filter &&
      getSelectedRange(CalendarVariant.Filter) &&
      isCurrentMonth;

    switch (true) {
      case requestParsingCondition:
        return parseStringToDate(evenDayToString, 'yearFirst');
      case filterParsingCondition:
        return parseStringToDate(evenDayToString, 'dayFirst');

      default:
        return 0;
    }
  };

  const getValidRange = (position: CalendarVariant): boolean => {
    const validFilterRange =
      isFilterPeriod && isSameDay(day, getParsedDate(CalendarVariant.Filter));
    const validRequestRange =
      isRequestPeriod && isSameDay(day, getParsedDate(CalendarVariant.Search));

    return position === CalendarVariant.Filter ? validFilterRange : validRequestRange;
  };

  const getSelectedStyles = () => {
    switch (true) {
      case getValidRange(variant):
        return variant === CalendarVariant.Search
          ? 'text-whiteBase bg-accentBase'
          : 'border-2 border-solid border-accentBase dark:border-whiteBase';

      default:
        return '';
    }
  };

  const getDefaultStyles = () => {
    const defaultRequestCondition =
      variant === CalendarVariant.Search &&
      !isRequestPeriod &&
      !getValidRange(CalendarVariant.Search);

    const defaultFilterCondition =
      variant === CalendarVariant.Filter &&
      !isFilterPeriod &&
      !getValidRange(CalendarVariant.Filter);

    if (isTodayDate && (defaultRequestCondition || defaultFilterCondition))
      return 'bg-accentBase text-whiteBase';

    return '';
  };

  return { getSelectedStyles, getDefaultStyles, isCurrentMonth };
};

export default useSelectedPeriod;
