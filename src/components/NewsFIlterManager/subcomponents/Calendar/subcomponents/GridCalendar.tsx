import React, { FC } from 'react';
import { format, getDay, isSameDay, isSameMonth, isToday, parse } from 'date-fns';

import { useSelectedDate } from 'contexts';
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
  const { selectedRequestDate, selectedFilterDate } = useSelectedDate();

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

  const dayToString = getStringDateToCalendar(day, variant);

  let filterFormatToSearch: string | null = null;
  let isFilterDayRangeSelected: string | boolean | null = null;
  let filterDate = false;

  let dayToParse: number | Date = 0;
  let filterDayToParse: number | Date = 0;

  if (variant === 'FiltersBlock') {
    filterFormatToSearch = formatDateToYYYYMMDD(dayToString);
  }

  const searchDayString = filterFormatToSearch ? filterFormatToSearch : dayToString;

  const isSearchDayRangeSelected = isDayInRange(
    selectedRequestDate.beginDate,
    selectedRequestDate.endDate,
    searchDayString,
  );

  if (variant === 'FiltersBlock') {
    isFilterDayRangeSelected = isDayInRange(
      selectedFilterDate.beginDate,
      selectedFilterDate.endDate,
      dayToString,
    );
  }

  if (isSearchDayRangeSelected && isCurrentMonth) {
    dayToParse = parse(searchDayString, 'yyyyMMdd', new Date());
  }

  if (variant === 'FiltersBlock' && isFilterDayRangeSelected && isCurrentMonth) {
    filterDayToParse = parse(dayToString, 'dd/MM/yyyy', new Date());
  }

  const searchDate =
    selectedRequestDate?.beginDate !== null &&
    selectedRequestDate?.endDate !== null &&
    isSameDay(day, dayToParse);

  if (variant === 'FiltersBlock') {
    filterDate =
      selectedFilterDate?.beginDate !== null &&
      selectedFilterDate?.endDate !== null &&
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
    selectedRequestDate?.beginDate === null &&
    selectedRequestDate?.endDate === null &&
    isTodayDate &&
    !searchDate
      ? 'bg-accentBase text-whiteBase'
      : '';

  let defaultFilterStyle =
    selectedFilterDate?.beginDate === null &&
    selectedFilterDate?.endDate === null &&
    isTodayDate &&
    !filterDate
      ? 'bg-accentBase text-whiteBase'
      : '';

  if (variant === 'FiltersBlock' && selectedRequestDate.endDate) {
    defaultFilterStyle = '';
  }

  const defaultTodayStyle = variant === 'FiltersBlock' ? defaultFilterStyle : defaultSearchStyle;

  return (
    <div className={COL_START_CLASSES[getDay(day)]}>
      <p
        className={`${commonStyles} ${currentMonthDatesStyle} ${selectedSearchStyle} ${selectedFilterStyle} ${defaultTodayStyle}`}
        onClick={handleDateClick}
      >
        {format(day, 'd')}
      </p>
    </div>
  );
};

export default GridCalendar;
