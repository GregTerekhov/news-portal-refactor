import React, { FC } from 'react';

import { formatDateToString } from 'helpers';

import ArrowButton from './ArrowButton';

type ControlFunction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

interface CalendarControlsProps {
  firstDayOfMonth: Date;
  getPrevYear: ControlFunction;
  getNextYear: ControlFunction;
  getPrevMonth: ControlFunction;
  getNextMonth: ControlFunction;
}

type ButtonsBlock = {
  id: string;
  onPrevClick: ControlFunction;
  onNextClick: ControlFunction;
  formattedDate: string;
};

const CalendarControls: FC<CalendarControlsProps> = ({
  firstDayOfMonth,
  getPrevYear,
  getNextYear,
  getPrevMonth,
  getNextMonth,
}) => {
  //Data для кнопок переключення місяців та років
  const controlButtonsBlock: ButtonsBlock[] = [
    {
      id: 'year',
      onPrevClick: getPrevYear,
      onNextClick: getNextYear,
      formattedDate: formatDateToString(firstDayOfMonth).year,
    },
    {
      id: 'month',
      onPrevClick: getPrevMonth,
      onNextClick: getNextMonth,
      formattedDate: formatDateToString(firstDayOfMonth).month,
    },
  ];

  const commonTextStyles =
    'ext-center text-medium font-medium leading-tight tracking-tightest text-fullDark dark:text-contrastWhite';

  return (
    <div className='mb-5 flex items-center justify-between py-[7px]'>
      {Array.isArray(controlButtonsBlock) &&
        controlButtonsBlock.map(({ id, onPrevClick, onNextClick, formattedDate }) => (
          <div className='flex items-center gap-x-2' key={id}>
            <ArrowButton
              ariaLabel={`Previous ${id} button`}
              iconClass='rotate-90'
              onClick={onPrevClick}
            >
              {`Previous ${id} button`}
            </ArrowButton>
            <p className={`${commonTextStyles}`}>{formattedDate}</p>
            <ArrowButton
              ariaLabel={`Next ${id} button`}
              onClick={onNextClick}
              iconClass='-rotate-90'
            >
              {`Next ${id} button`}
            </ArrowButton>
          </div>
        ))}
    </div>
  );
};

export default CalendarControls;
