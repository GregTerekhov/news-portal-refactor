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
  const { dateToString } = useCalendarDayFormat();

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

  // const searchDayToString = format(day, 'yyyyMMdd');
  // const filterDayToString = format(day, 'dd/MM/yyyy');

  let dayToParse: number | Date = 0;

  // let searchDayParse: number | Date = 0;
  // let filterDayParse: number | Date = 0;

  // let searchDaySelected: string = 'search';
  // let filterDaySelected: string = 'filter';

  // let isStyleCrossing: string = '';

  const isSearchDayRangeSelected =
    selectedRequestDate.beginDate &&
    selectedRequestDate.endDate &&
    dayToString &&
    selectedRequestDate.beginDate <= dayToString &&
    selectedRequestDate.endDate >= dayToString;

  const isFilterDayRangeSelected =
    selectedFilterDate.beginDate &&
    selectedFilterDate.beginDate <= dayToString &&
    selectedFilterDate.endDate &&
    selectedFilterDate.endDate >= dayToString;

  if (isSearchDayRangeSelected && isCurrentMonth) {
    dayToParse = parse(dayToString, 'yyyyMMdd', new Date());
    // searchDaySelected = format(day, 'yyyyMMdd');
  }

  if (isFilterDayRangeSelected && isCurrentMonth) {
    dayToParse = parse(dayToString, 'dd/MM/yyyy', new Date());
    // filterDaySelected = format(day, 'yyyyMMdd');
  }

  const searchDate =
    selectedRequestDate?.beginDate !== null &&
    selectedRequestDate?.endDate !== null &&
    isSameDay(day, dayToParse);
  const filterDate =
    selectedFilterDate?.beginDate !== null &&
    selectedFilterDate?.endDate !== null &&
    isSameDay(day, dayToParse);

  // if (filterDaySelected === searchDaySelected) {
  //   isStyleCrossing = 'border-2 border-white';
  // }

  const isSelectedDate = searchDate || filterDate;

  const commonStyles =
    'flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-base font-medium leading-mostRelaxed tracking-widest hover:bg-accentBase hover:text-contrastWhite';
  const isSelectedStyle = isSelectedDate ? 'text-whiteBase bg-accentBase' : '';

  const currentMonthDatesStyle = isCurrentMonth
    ? 'text-fullDark dark:text-contrastWhite'
    : 'text-calendarTextLight dark:text-greyBase';

  const defaultSearchStyle =
    selectedRequestDate?.beginDate === null &&
    selectedRequestDate?.endDate === null &&
    isTodayDate &&
    !isSelectedDate
      ? 'bg-accentBase text-whiteBase'
      : '';

  const defaultFilterStyle =
    selectedFilterDate?.beginDate === null &&
    selectedFilterDate?.endDate === null &&
    isTodayDate &&
    !isSelectedDate
      ? 'bg-accentBase text-whiteBase'
      : '';

  const defaultTodayStyle = defaultSearchStyle && defaultFilterStyle;

  return (
    <div className={COL_START_CLASSES[getDay(day)]}>
      <p
        className={`${commonStyles} ${currentMonthDatesStyle} ${isSelectedStyle} ${defaultTodayStyle}`}
        onClick={handleDateClick}
      >
        {format(day, 'd')}
      </p>
    </div>
  );
};

export default GridCalendar;
