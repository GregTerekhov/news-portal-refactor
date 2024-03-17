import React, { FC } from 'react';

import CalendarControls from './CalendarControls';
import GridCalendar from './GridCalendar';
import WeekDays from './WeekDays';

import { useControlCalendar, useFilterDateChange } from '../hooks';
interface CalendarContentProps {
  variant: string;
}

const CalendarContent: FC<CalendarContentProps> = ({ variant }) => {
  const {
    firstDayOfMonth,
    currMonth,
    daysInMonth,
    getPrevMonth,
    getNextMonth,
    getPrevYear,
    getNextYear,
  } = useControlCalendar();

  const { handleFilterDate } = useFilterDateChange();

  return (
    <div className='absolute z-40 w-full rounded-[20px] bg-dropdownBase px-4 pb-5 pt-4 shadow-card dark:bg-darkDropdown dark:shadow-darkCard'>
      <CalendarControls
        firstDayOfMonth={firstDayOfMonth}
        getPrevMonth={getPrevMonth}
        getNextMonth={getNextMonth}
        getPrevYear={getPrevYear}
        getNextYear={getNextYear}
      />
      <WeekDays />
      <div className='mt-3.5 grid grid-cols-7 place-items-center gap-x-[18px] gap-y-3'>
        {daysInMonth &&
          daysInMonth.map((day, idx) => (
            <GridCalendar
              key={idx}
              day={day}
              currMonth={currMonth}
              handleFilterDate={handleFilterDate}
              variant={variant}
            />
          ))}
      </div>
    </div>
  );
};

export default CalendarContent;
