import React, { FC } from 'react';
import { format } from 'date-fns';

import ArrowButton from './ArrowButton';
import GridCalendar from './GridCalendar';
import WeekDays from './WeekDays';

import { useCalendar } from '../hooks';

interface CalendarContentProps {
  variant: string;
  handleDateFilter: (date: Date) => void;
}

const CalendarContent: FC<CalendarContentProps> = ({ variant, handleDateFilter }) => {
  const { firstDayOfMonth, getPrevMonth, getNextMonth, getPrevYear, getNextYear } = useCalendar();

  return (
    <div className='absolute z-40 w-[250px] rounded-[20px] bg-dropdownBase px-4 pb-5 pt-4 shadow-card dark:bg-darkDropdown dark:shadow-darkCard'>
      <div className='mb-0.5 flex items-center justify-between py-[7px]'>
        <div className='flex items-center gap-2'>
          <ArrowButton ariaLabel='Previous year button' onClick={getPrevYear}>
            Previous year button
          </ArrowButton>
          <p className='text-center text-medium font-medium leading-tight tracking-tightest text-fullDark dark:text-contrastWhite'>
            {format(firstDayOfMonth, 'yyyy')}
          </p>
          <ArrowButton ariaLabel='Next year button' onClick={getNextYear} iconClass='rotate-180'>
            Next year button
          </ArrowButton>
        </div>
        <div className='flex'>
          <ArrowButton ariaLabel='Previous month button' onClick={getPrevMonth}>
            Previous month button
          </ArrowButton>
          <p className='text-center text-medium font-medium leading-tight tracking-tightest text-fullDark dark:text-contrastWhite'>
            {format(firstDayOfMonth, 'MMMM')}
          </p>
          <ArrowButton ariaLabel='Next month button' onClick={getNextMonth} iconClass='rotate-180'>
            Next month button
          </ArrowButton>
        </div>
      </div>
      <WeekDays />
      <GridCalendar variant={variant} handleDateFilter={handleDateFilter} />
    </div>
  );
};

export default CalendarContent;
