import React from 'react';

import { DAYS, capitalizeFirstLetter } from '../assistants';

const WeekDays = () => {
  return (
    <div className='grid grid-cols-7 gap-[18px] place-items-center'>
      {DAYS.map((day, idx) => (
        <p
          key={idx}
          className='text-small font-normal leading-normal tracking-tight text-calendarTextLight dark:text-greyAlt'
        >
          {capitalizeFirstLetter(day)}
        </p>
      ))}
    </div>
  );
};

export default WeekDays;
