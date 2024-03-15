import React, { FC } from 'react';
import { format, getDay, isSameDay, isSameMonth, isToday, parse } from 'date-fns';

import { useSelectedDate } from 'contexts';

import { COL_START_CLASSES } from '../assistants';
import { useRequestByDate, useCalendarDayFormat } from '../hooks';

interface GridCalendarProps {
  variant: string;
  day: Date;
  currMonth: string;
  handleFilterDate: (date: Date) => void;
}

const GridCalendar: FC<GridCalendarProps> = ({ day, currMonth, handleFilterDate, variant }) => {
  const { selectedRequestDate, selectedFilterDate } = useSelectedDate();
  const { handleDateRequest } = useRequestByDate();
  const { dateToString, isDayInRange, dayFormatConverter } = useCalendarDayFormat();

  const handleDateClick = () => {
    console.log(variant);
    if (variant === 'SearchBlock') {
      handleDateRequest(day);
    } else {
      handleFilterDate(day);
    }
  };

  const isCurrentMonth = isSameMonth(day, parse(currMonth, 'MMM-yyyy', new Date()));
  const isTodayDate = isToday(day);

  const dayToString = dateToString(day, variant);

  let filterFormatToSearch: string | null = null;
  let isFilterDayRangeSelected: string | boolean | null = null;
  let filterDate: boolean = false;

  let dayToParse: number | Date = 0;
  let filterDayToParse: number | Date = 0;

  if (variant === 'FiltersBlock') {
    filterFormatToSearch = dayFormatConverter(dayToString);
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
  const selectedFilterStyle = filterDate ? 'border-2 border-white' : '';

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
  console.log('filterDate', filterDate);

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
