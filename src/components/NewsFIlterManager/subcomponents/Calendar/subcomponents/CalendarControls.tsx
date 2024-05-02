import React, { FC } from 'react';

import { formatDateToString } from 'helpers';

import ArrowButton from './ArrowButton';

type ControlFunction = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  amount: number,
) => void;

interface CalendarControlsProps {
  firstDayOfMonth: Date;
  handleChangeMonth: ControlFunction;
  handleChangeYear: ControlFunction;
}

type ButtonsBlock = {
  id: string;
  onPrevClick: ControlFunction;
  onNextClick: ControlFunction;
  formattedDate: string;
};

const CalendarControls: FC<CalendarControlsProps> = ({
  firstDayOfMonth,
  handleChangeMonth,
  handleChangeYear,
}) => {
  //Data для кнопок переключення місяців та років
  const controlButtonsBlock: ButtonsBlock[] = [
    {
      id: 'year',
      onPrevClick: handleChangeYear,
      onNextClick: handleChangeYear,
      formattedDate: formatDateToString(firstDayOfMonth).year,
    },
    {
      id: 'month',
      onPrevClick: handleChangeMonth,
      onNextClick: handleChangeMonth,
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
              onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                onPrevClick(event, -1)
              }
            >
              {`Previous ${id} button`}
            </ArrowButton>
            <p className={`${commonTextStyles}`}>{formattedDate}</p>
            <ArrowButton
              ariaLabel={`Next ${id} button`}
              onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                onNextClick(event, 1)
              }
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
