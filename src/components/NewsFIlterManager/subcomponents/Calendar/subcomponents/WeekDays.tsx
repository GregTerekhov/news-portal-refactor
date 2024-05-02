import React from 'react';

import { DAYS, capitalizeFirstLetter } from '../assistants';

const WeekDays = () => {
  return (
    <div className='grid grid-cols-7 place-items-center gap-[18px]'>
      {DAYS.map((day) => (
        <p
          key={day}
          className='text-small font-normal leading-normal tracking-tight text-calendarTextLight dark:text-greyAlt'
        >
          {capitalizeFirstLetter(day)}
        </p>
      ))}
    </div>
  );
};

export default WeekDays;
