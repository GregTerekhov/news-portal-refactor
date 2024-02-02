import React, { FC } from 'react';
import { format, getDay, isSameDay, isSameMonth, isToday, parse } from 'date-fns';
import { useSelectedDate } from 'contexts';

import { COL_START_CLASSES } from '../assistants';
import { useCalendar } from '../hooks';

interface GridCalendarProps {
  variant: string;
  handleDateFilter: (date: Date) => void;
}

const GridCalendar: FC<GridCalendarProps> = ({ variant, handleDateFilter }) => {
  const { selectedRequestDate, handleDateRequest } = useSelectedDate();
  const { currMonth, daysInMonth } = useCalendar();

  return (
    <div className='mt-3.5 grid grid-cols-7 place-items-center gap-x-[18px] gap-y-3'>
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
                className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-base font-medium leading-mostRelaxed tracking-widest hover:bg-accentBase hover:text-contrastWhite ${
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
                          ? 'bg-accentBase text-whiteBase'
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
  );
};

export default GridCalendar;
