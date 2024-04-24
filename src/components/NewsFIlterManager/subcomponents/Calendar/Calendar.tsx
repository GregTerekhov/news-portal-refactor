import React, { FC } from 'react';

import type { CalendarVariant } from 'types';
import { useActiveLinks, usePopUp } from 'hooks';

import { SvgIcon } from 'ui';

import { CalendarContent } from './subcomponents';
import { useCalendarText } from './hooks';

const Calendar: FC<{ variant: CalendarVariant }> = ({ variant }) => {
  const { popUpRef, toggleCalendar, isOpenCalendar } = usePopUp();
  const { isReadActive } = useActiveLinks();
  const { showButtonText } = useCalendarText();

  const calendarButtonStyles =
    'w-full bg-whiteBase dark:bg-darkBackground rounded-[20px] border border-solid border-accentBase dark:border-greyBase text-accentBase dark:text-greyAlt flex justify-between items-center py-2 px-3 group-hover:text-whiteBase group-focus:text-whiteBase group-focus:bg-accentBase group-hover:bg-accentBase group-hover:border-whiteBase group-focus:border-whiteBase transition-colors text-small md:text-base lg:text-medium leading-mediumRelaxed md:leading-moreRelaxed tracking-bigWide md:tracking-wider';

  return (
    <div ref={popUpRef} className={`relative space-y-2 ${isReadActive ? null : 'col-span-4'}`}>
      <p className='text-base text-darkBase dark:text-greyAlt lg:text-medium'>
        {variant === 'SearchBlock' ? 'Search' : 'Filter'} by Date or Date Period:
      </p>
      <button
        id='Toggle calendar button'
        type='button'
        onClick={toggleCalendar}
        className={`${calendarButtonStyles}`}
      >
        <SvgIcon svgName='calendar' sizeKey='smIcon20' className='fill-accentBase' />
        {showButtonText(variant)}
        <SvgIcon
          svgName='arrow'
          sizeKey='xsIcon14'
          className={`fill-accentBase transition-transform ${
            isOpenCalendar ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      {isOpenCalendar && (
        <CalendarContent
          variant={variant}
          isOpenCalendar={isOpenCalendar}
          toggleCalendar={toggleCalendar}
        />
      )}
    </div>
  );
};

export default React.memo(Calendar);
