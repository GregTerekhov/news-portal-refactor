import React, { FC } from 'react';

import type { CalendarVariant } from 'types';

import { useActiveLinks, usePopUp } from 'hooks';

import { SvgIcon } from 'ui';
import { CalendarContent } from './subcomponents';

import { useCalendarText } from './hooks';
import { calendarButtonStyles, getIconClass, getWrapperClass } from './assistants';

const Calendar: FC<{ variant: CalendarVariant }> = ({ variant }) => {
  const { popUpRef, toggleCalendar, isOpenCalendar } = usePopUp();
  const { isReadActive } = useActiveLinks();
  const { showButtonText } = useCalendarText();

  const wrapperClass = getWrapperClass(isReadActive);
  const iconClass = getIconClass(isOpenCalendar);

  return (
    <div ref={popUpRef} className={wrapperClass}>
      <p className='text-base text-darkBase dark:text-greyAlt lg:text-medium'>
        {variant === 'SearchBlock' ? 'Search' : 'Filter'} by Date or Date Period:
      </p>
      <button
        id='Toggle calendar button'
        type='button'
        onClick={toggleCalendar}
        className={calendarButtonStyles}
      >
        <SvgIcon svgName='calendar' sizeKey='smIcon20' className='fill-accentBase' />
        {showButtonText(variant)}
        <SvgIcon svgName='arrow' sizeKey='xsIcon14' className={iconClass} />
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
