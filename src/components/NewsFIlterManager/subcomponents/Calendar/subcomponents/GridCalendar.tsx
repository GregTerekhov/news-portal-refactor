import React, { FC } from 'react';
import { format, getDay, isSameDay, isSameMonth, isToday, parse } from 'date-fns';

import { useSelectedDateContext } from 'contexts';
import { formatDateToYYYYMMDD, getStringDateToCalendar, isDayInRange } from 'helpers';

import { COL_START_CLASSES } from '../assistants';
import { useRequestByDate } from '../hooks';

interface GridCalendarProps {
  variant: string;
  day: Date;
  currMonth: string;
  handleFilterDate: (date: Date, isOpenCalendar: boolean, toggleCalendar: () => void) => void;
  isOpenCalendar: boolean;
  toggleCalendar: () => void;
}

const GridCalendar: FC<GridCalendarProps> = ({
  day,
  currMonth,
  handleFilterDate,
  variant,
  isOpenCalendar,
  toggleCalendar,
}) => {
  const { memoizedSelectedRequestDate, memoizedSelectedFilterDate } = useSelectedDateContext();

  const { handleDateRequest } = useRequestByDate();

  const handleDateClick = () => {
    if (variant === 'SearchBlock') {
      handleDateRequest(day, isOpenCalendar, toggleCalendar);
    } else {
      handleFilterDate(day, isOpenCalendar, toggleCalendar);
    }
  };

  const isCurrentMonth = isSameMonth(day, parse(currMonth, 'MMM-yyyy', new Date()));
  const isTodayDate = isToday(day);
  const evenDayToString = getStringDateToCalendar(day, variant);

  let isFilterDayRangeSelected: string | boolean | null = null;
  let filterDate = false;

  let dayToParse: number | Date = 0;
  let filterDayToParse: number | Date = 0;

  const validDateValue =
    variant === 'FiltersBlock' ? formatDateToYYYYMMDD(evenDayToString) : evenDayToString;

  const isSearchDayRangeSelected = isDayInRange(
    memoizedSelectedRequestDate?.beginDate,
    memoizedSelectedRequestDate?.endDate,
    validDateValue,
  );

  if (variant === 'FiltersBlock') {
    isFilterDayRangeSelected = isDayInRange(
      memoizedSelectedFilterDate?.beginDate,
      memoizedSelectedFilterDate?.endDate,
      evenDayToString,
    );
  }

  if (isSearchDayRangeSelected && isCurrentMonth) {
    dayToParse = parse(validDateValue, 'yyyyMMdd', new Date());
  }

  if (variant === 'FiltersBlock' && isFilterDayRangeSelected && isCurrentMonth) {
    filterDayToParse = parse(evenDayToString, 'dd/MM/yyyy', new Date());
  }

  const searchDate =
    memoizedSelectedRequestDate?.beginDate !== null &&
    memoizedSelectedRequestDate?.endDate !== null &&
    isSameDay(day, dayToParse);

  if (variant === 'FiltersBlock') {
    filterDate =
      memoizedSelectedFilterDate?.beginDate !== null &&
      memoizedSelectedFilterDate?.endDate !== null &&
      isSameDay(day, filterDayToParse);
  }

  const commonStyles =
    'flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-base font-medium leading-mostRelaxed tracking-widest hover:bg-accentBase hover:text-contrastWhite';
  const currentMonthDatesStyle = isCurrentMonth
    ? 'text-fullDark dark:text-contrastWhite'
    : 'text-calendarTextLight dark:text-greyBase';

  const selectedSearchStyle = searchDate ? 'text-whiteBase bg-accentBase' : '';
  const selectedFilterStyle = filterDate ? 'border-2 border-whiteBase' : '';

  const defaultSearchStyle =
    memoizedSelectedRequestDate?.beginDate === null &&
    memoizedSelectedRequestDate?.endDate === null &&
    isTodayDate &&
    !searchDate
      ? 'bg-accentBase text-whiteBase'
      : '';

  let defaultFilterStyle =
    memoizedSelectedFilterDate?.beginDate === null &&
    memoizedSelectedFilterDate?.endDate === null &&
    isTodayDate &&
    !filterDate
      ? 'bg-accentBase text-whiteBase'
      : '';

  if (variant === 'FiltersBlock' && memoizedSelectedRequestDate.endDate) {
    defaultFilterStyle = '';
  }

  const defaultTodayStyle = variant === 'FiltersBlock' ? defaultFilterStyle : defaultSearchStyle;

  return (
    <div className={COL_START_CLASSES[getDay(day)]}>
      <button
        type='button'
        className={
          commonStyles +
          ' ' +
          currentMonthDatesStyle +
          ' ' +
          selectedSearchStyle +
          ' ' +
          selectedFilterStyle +
          ' ' +
          defaultTodayStyle
        }
        onClick={handleDateClick}
      >
        {format(day, 'd')}
      </button>
    </div>
  );
};

export default GridCalendar;
