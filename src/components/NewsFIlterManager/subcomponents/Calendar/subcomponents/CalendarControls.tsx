import React, { FC } from 'react';

import type { ControlCalendar } from 'types';

import ArrowButton from './ArrowButton';

import { formatDateToString } from 'helpers';
import { getControlButtons } from '../assistants';

enum DirectionalStep {
  Previous = -1,
  Next = 1,
}

interface ICalendarControlsProps {
  firstDayOfMonth: Date;
  handleChangeMonth: ControlCalendar;
  handleChangeYear: ControlCalendar;
}

const CalendarControls: FC<ICalendarControlsProps> = ({
  firstDayOfMonth,
  handleChangeMonth,
  handleChangeYear,
}) => {
  const { year, month } = formatDateToString(firstDayOfMonth);

  //Data для кнопок переключення місяців та років
  const controlButtonsBlock = getControlButtons(year, month, handleChangeYear, handleChangeMonth);

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
              onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                onPrevClick(event, DirectionalStep.Previous)
              }
            />
            <p className={commonTextStyles}>{formattedDate}</p>
            <ArrowButton
              ariaLabel={`Next ${id} button`}
              onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                onNextClick(event, DirectionalStep.Next)
              }
              iconClass='-rotate-90'
            />
          </div>
        ))}
    </div>
  );
};

export default CalendarControls;
