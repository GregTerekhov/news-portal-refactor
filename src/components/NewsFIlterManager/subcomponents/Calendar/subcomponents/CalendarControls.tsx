import React, { FC } from 'react';
import { format } from 'date-fns';

import ArrowButton from './ArrowButton';

type ControlFunction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

interface CalendarControlsProps {
  firstDayOfMonth: Date;
  getPrevYear: ControlFunction;
  getNextYear: ControlFunction;
  getPrevMonth: ControlFunction;
  getNextMonth: ControlFunction;
}

const CalendarControls: FC<CalendarControlsProps> = ({
  firstDayOfMonth,
  getPrevYear,
  getNextYear,
  getPrevMonth,
  getNextMonth,
}) => {
  return (
    <div className='mb-0.5 flex items-center justify-between py-[7px]'>
      <div className='flex items-center gap-2'>
        <ArrowButton ariaLabel='Previous year button' iconClass='rotate-90' onClick={getPrevYear}>
          Previous year button
        </ArrowButton>
        <p className='text-center text-medium font-medium leading-tight tracking-tightest text-fullDark dark:text-contrastWhite'>
          {format(firstDayOfMonth, 'yyyy')}
        </p>
        <ArrowButton ariaLabel='Next year button' onClick={getNextYear} iconClass='-rotate-90'>
          Next year button
        </ArrowButton>
      </div>
      <div className='flex'>
        <ArrowButton ariaLabel='Previous month button' iconClass='rotate-90' onClick={getPrevMonth}>
          Previous month button
        </ArrowButton>
        <p className='text-center text-medium font-medium leading-tight tracking-tightest text-fullDark dark:text-contrastWhite'>
          {format(firstDayOfMonth, 'MMMM')}
        </p>
        <ArrowButton ariaLabel='Next month button' onClick={getNextMonth} iconClass='-rotate-90'>
          Next month button
        </ArrowButton>
      </div>
    </div>
  );
};

export default CalendarControls;
