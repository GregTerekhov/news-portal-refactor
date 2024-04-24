import { isSameDay, isSameMonth, isToday } from 'date-fns';

import type { CalendarVariant } from 'types';
import { useSelectedDateContext } from 'contexts';

import { getStringDateToCalendar, isDayInRange, parseStringToDate } from 'helpers';

const useSelectedPeriod = (day: Date, currentMonth: string, variant: CalendarVariant) => {
  const { memoizedSelectedRequestDate, memoizedSelectedFilterDate } = useSelectedDateContext();

  const isRequestPeriod =
    !!memoizedSelectedRequestDate.beginDate && !!memoizedSelectedRequestDate.endDate;
  const isFilterPeriod =
    !!memoizedSelectedFilterDate.beginDate && !!memoizedSelectedFilterDate.endDate;

  const isCurrentMonth = isSameMonth(day, parseStringToDate(currentMonth));
  const isTodayDate = isToday(day);
  const evenDayToString = getStringDateToCalendar(day, variant);

  const getSelectedRange = (position: string): boolean => {
    return position === 'FiltersBlock'
      ? isDayInRange(
          memoizedSelectedFilterDate.beginDate,
          memoizedSelectedFilterDate.endDate,
          evenDayToString,
        )
      : isDayInRange(
          memoizedSelectedRequestDate.beginDate,
          memoizedSelectedRequestDate.endDate,
          evenDayToString,
        );
  };

  const getParsedDate = (position: string): Date | 0 => {
    const requestParsingCondition =
      position === 'SearchBlock' && getSelectedRange('SearchBlock') && isCurrentMonth;
    const filterParsingCondition =
      position === 'FiltersBlock' && getSelectedRange('FiltersBlock') && isCurrentMonth;

    switch (true) {
      case requestParsingCondition:
        return parseStringToDate(evenDayToString, 'yearFirst');
      case filterParsingCondition:
        return parseStringToDate(evenDayToString, 'dayFirst');

      default:
        return 0;
    }
  };

  const getValidRange = (position: string): boolean => {
    const validFilterRange = isFilterPeriod && isSameDay(day, getParsedDate('FiltersBlock'));
    const validRequestRange = isRequestPeriod && isSameDay(day, getParsedDate('SearchBlock'));

    return position === 'FiltersBlock' ? validFilterRange : validRequestRange;
  };

  const getSelectedStyles = () => {
    switch (true) {
      case getValidRange(variant):
        return variant === 'SearchBlock'
          ? 'text-whiteBase bg-accentBase'
          : 'border-2 border-solid border-accentBase dark:border-whiteBase';

      default:
        return '';
    }
  };

  const getDefaultStyles = () => {
    const defaultRequestCondition =
      variant === 'SearchBlock' && !isRequestPeriod && isTodayDate && !getValidRange('SearchBlock');

    const defaultFilterCondition =
      variant === 'FiltersBlock' &&
      !isFilterPeriod &&
      isTodayDate &&
      !getValidRange('FiltersBlock');

    if (defaultRequestCondition || defaultFilterCondition) return 'bg-accentBase text-whiteBase';

    return '';
  };

  return { getSelectedStyles, getDefaultStyles, isCurrentMonth };
};

export default useSelectedPeriod;
