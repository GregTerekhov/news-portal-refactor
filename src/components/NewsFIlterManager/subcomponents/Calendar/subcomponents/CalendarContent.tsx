import React, { FC } from 'react';
import { format, getDay, isSameDay, isSameMonth, isToday, parse } from 'date-fns';

import { useSelectedDate } from 'contexts';

import ArrowButton from './ArrowButton';
import WeekDays from './WeekDays';

import { COL_START_CLASSES } from '../assistants';
import { useCalendar } from '../hooks';

interface CalendarContentProps {
  variant: string;
  handleDateFilter: (date: Date) => void;
}

const CalendarContent: FC<CalendarContentProps> = ({ variant, handleDateFilter }) => {
  const { selectedRequestDate, handleDateRequest } = useSelectedDate();

  const {
    currMonth,
    firstDayOfMonth,
    daysInMonth,
    getPrevMonth,
    getNextMonth,
    getPrevYear,
    getNextYear,
  } = useCalendar();

  return (
    <div className='w-[250px] bg-dropdownBase dark:bg-darkDropdown absolute z-40 rounded-[20px] pt-4 px-4 pb-5 shadow-card dark:shadow-darkCard'>
      <div className='flex items-center justify-between py-[7px] mb-0.5'>
        <div className='flex gap-2 items-center'>
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
      <div className='grid grid-cols-7 gap-y-3 gap-x-[18px] mt-3.5 place-items-center'>
        {daysInMonth &&
          daysInMonth.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, parse(currMonth, 'MMM-yyyy', new Date()));
            const isTodayDate = isToday(day);
            const isSelectedDate =
              (selectedRequestDate?.beginDate !== null &&
                isSameDay(day, parse(selectedRequestDate?.beginDate, 'yyyyMMdd', new Date()))) ||
              (selectedRequestDate?.endDate !== null &&
                isSameDay(day, parse(selectedRequestDate?.endDate, 'yyyyMMdd', new Date())));
            const isSelectedStyle = isSelectedDate ? 'text-whiteBase bg-accentBase' : '';
            return (
              <div key={idx} className={COL_START_CLASSES[getDay(day)]}>
                <p
                  className={`hover:text-contrastWhite hover:bg-accentBase cursor-pointer flex items-center justify-center text-base tracking-widest leading-mostRelaxed font-medium h-7 w-7 rounded-full ${
                    isCurrentMonth
                      ? 'text-fullDark dark:text-contrastWhite'
                      : 'text-calendarTextLight dark:text-greyBase'
                  } 
                  ${isSelectedStyle} 
                      ${
                        selectedRequestDate?.beginDate === null &&
                        selectedRequestDate?.endDate === null &&
                        isTodayDate &&
                        !isSelectedDate
                          ? 'text-whiteBase bg-accentBase'
                          : ''
                      }
                    `}
                  onClick={
                    variant === 'SearchBlock'
                      ? () => handleDateRequest(day)
                      : () => handleDateFilter(day)
                  }
                >
                  {format(day, 'd')}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CalendarContent;
