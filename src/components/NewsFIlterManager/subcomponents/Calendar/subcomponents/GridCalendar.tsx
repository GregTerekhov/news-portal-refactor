import React, { FC } from 'react';
import { format, getDay } from 'date-fns';

import type { CalendarVariant } from 'types';

import { COL_START_CLASSES } from '../assistants';
import { useRequestByDate, useSelectedPeriod } from '../hooks';

interface GridCalendarProps {
  variant: CalendarVariant;
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
  const { handleDateRequest } = useRequestByDate();
  const { getSelectedStyles, getDefaultStyles, isCurrentMonth } = useSelectedPeriod(
    day,
    currMonth,
    variant,
  );

  const handleDateClick = () => {
    variant === 'SearchBlock'
      ? handleDateRequest(day, isOpenCalendar, toggleCalendar)
      : handleFilterDate(day, isOpenCalendar, toggleCalendar);
  };

  const commonStyles =
    'flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-base font-medium leading-mostRelaxed tracking-widest hover:bg-accentBase hover:text-contrastWhite';

  const currentMonthDatesStyle = isCurrentMonth
    ? 'text-fullDark dark:text-contrastWhite'
    : 'text-calendarTextLight dark:text-greyBase';

  return (
    <div className={COL_START_CLASSES[getDay(day)]}>
      <button
        type='button'
        className={
          commonStyles +
          ' ' +
          currentMonthDatesStyle +
          ' ' +
          getSelectedStyles() +
          ' ' +
          getDefaultStyles()
        }
        onClick={handleDateClick}
      >
        {format(day, 'd')}
      </button>
    </div>
  );
};

export default GridCalendar;
