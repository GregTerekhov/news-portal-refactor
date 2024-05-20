import React, { FC } from 'react';

import { CalendarVariant } from 'types';

import CalendarControls from './CalendarControls';
import GridCalendar from './GridCalendar';
import WeekDays from './WeekDays';

import { useControlCalendar, useFilterDateChange } from '../hooks';
interface ICalendarContentProps {
  variant: CalendarVariant;
  isOpenCalendar: boolean;
  toggleCalendar: () => void;
}

const CalendarContent: FC<ICalendarContentProps> = ({
  variant,
  isOpenCalendar,
  toggleCalendar,
}) => {
  const {
    firstDayOfMonth,
    currMonth,
    daysInMonth,
    handleChangeMonth,
    handleChangeYear,
    generateKey,
  } = useControlCalendar();
  const { handleFilterDate } = useFilterDateChange();

  return (
    <div className='absolute z-40 w-full rounded-[20px] bg-dropdownBase px-4 pb-5 pt-4 shadow-card dark:bg-darkDropdown dark:shadow-darkCard'>
      <CalendarControls
        firstDayOfMonth={firstDayOfMonth}
        handleChangeMonth={handleChangeMonth}
        handleChangeYear={handleChangeYear}
      />
      <WeekDays />
      <div className='mt-3.5 grid grid-cols-7 place-items-center gap-x-[18px] gap-y-3'>
        {Array.isArray(daysInMonth) &&
          daysInMonth.map((day) => (
            <GridCalendar
              key={generateKey(day)}
              day={day}
              currMonth={currMonth}
              handleFilterDate={handleFilterDate}
              variant={variant}
              isOpenCalendar={isOpenCalendar}
              toggleCalendar={toggleCalendar}
            />
          ))}
      </div>
    </div>
  );
};

export default CalendarContent;
