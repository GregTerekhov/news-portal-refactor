import React, { FC } from 'react';
import { format, getDay, isSameDay, isSameMonth, isToday, parse } from 'date-fns';

import { useAdditionalRequest } from 'hooks';

import { SvgIcon } from 'ui';

import { DAYS, COL_START_CLASSES, capitalizeFirstLetter } from '../assistants';
import { useCalendar } from '../hooks';

interface CalendarContentProps {
  variant: string;
  handleDateFilter: (date: Date) => void;
}

const CalendarContent: FC<CalendarContentProps> = ({ variant, handleDateFilter }) => {
  const { selectedRequestDate, handleDateRequest } = useAdditionalRequest();

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
    <div className='w-[250px] bg-dropdownBase absolute z-40 rounded-[20px] pt-4 px-4 pb-5 shadow-card dark:shadow-darkCard'>
      <div className='flex items-center justify-between py-[7px] mb-0.5'>
        <div className='flex gap-2 items-center'>
          <button aria-label='Previous year button' type='button' onClick={getPrevYear}>
            <SvgIcon svgName='icon-arrow-left' size={20} className='fill-accentBase' />
          </button>
          <p className='text-center text-medium font-medium leading-tight tracking-tightest text-fullDark'>
            {format(firstDayOfMonth, 'yyyy')}
          </p>
          <button aria-label='Next year button' type='button' onClick={getNextYear}>
            <SvgIcon
              svgName='icon-arrow-right'
              size={20}
              className='stroke-accentBase fill-transparent'
            />
          </button>
        </div>
        <div className='flex'>
          <button aria-label='Previous month button' type='button' onClick={getPrevMonth}>
            <SvgIcon svgName='icon-arrow-left' size={20} className='fill-accentBase' />
          </button>
          <p className='text-center text-medium font-medium leading-tight tracking-tightest text-fullDark'>
            {format(firstDayOfMonth, 'MMM')}
          </p>
          <button aria-label='Next month button' type='button' onClick={getNextMonth}>
            <SvgIcon
              svgName='icon-arrow-right'
              size={20}
              className='stroke-accentBase fill-transparent'
            />
          </button>
        </div>
      </div>
      <div className='grid grid-cols-7 gap-[18px] place-items-center'>
        {DAYS.map((day, idx) => {
          return (
            <p
              key={idx}
              className='text-small font-normal leading-normal tracking-tight text-calendarTextLight'
            >
              {capitalizeFirstLetter(day)}
            </p>
          );
        })}
      </div>
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
                  className={`cursor-pointer flex items-center justify-center text-base tracking-widest leading-mostRelaxed font-medium h-7 w-7 rounded-full hover:text-contrastWhite hover:bg-accentBase hover:animate-pulse ${
                    isCurrentMonth ? 'text-fullDark' : 'text-calendarTextLight'
                  } ${isSelectedStyle} 
                      ${
                        selectedRequestDate && isTodayDate && !isSelectedDate
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