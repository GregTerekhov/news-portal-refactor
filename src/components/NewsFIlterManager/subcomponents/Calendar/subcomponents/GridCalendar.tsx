import React, { FC } from 'react';
import { format, getDay, isSameDay, isSameMonth, isToday, parse } from 'date-fns';

import { useSelectedDate } from 'contexts';

import { COL_START_CLASSES } from '../assistants';
import { useRequestByDate } from '../hooks';

interface GridCalendarProps {
  variant: string;
  day: Date;
  currMonth: string;
  handleFilterDate: (date: Date) => void;
}

const GridCalendar: FC<GridCalendarProps> = ({ day, currMonth, handleFilterDate, variant }) => {
  const { selectedRequestDate } = useSelectedDate();
  const { handleDateRequest } = useRequestByDate();

  const handleDateClick = () => {
    if (variant === 'SearchBlock') {
      handleDateRequest(day);
    } else {
      handleFilterDate(day);
    }
  };

  const isCurrentMonth = isSameMonth(day, parse(currMonth, 'MMM-yyyy', new Date()));
  const isTodayDate = isToday(day);
  const isSelectedDate =
    (selectedRequestDate?.beginDate !== null &&
      isSameDay(day, parse(selectedRequestDate?.beginDate, 'yyyyMMdd', new Date()))) ||
    (selectedRequestDate?.endDate !== null &&
      isSameDay(day, parse(selectedRequestDate?.endDate, 'yyyyMMdd', new Date())));

  const commonStyles =
    'flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-base font-medium leading-mostRelaxed tracking-widest hover:bg-accentBase hover:text-contrastWhite';
  const isSelectedStyle = isSelectedDate ? 'text-whiteBase bg-accentBase' : '';
  const currentMonthDatesStyle = isCurrentMonth
    ? 'text-fullDark dark:text-contrastWhite'
    : 'text-calendarTextLight dark:text-greyBase';
  const defaultTodayStyle =
    selectedRequestDate?.beginDate === null &&
    selectedRequestDate?.endDate === null &&
    isTodayDate &&
    !isSelectedDate
      ? 'bg-accentBase text-whiteBase'
      : '';

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
