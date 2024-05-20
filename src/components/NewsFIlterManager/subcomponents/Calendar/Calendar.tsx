import React, { FC } from 'react';

import { ButtonType, CalendarVariant, IconName, IconSizes } from 'types';

import { useActiveLinks, usePopUp } from 'hooks';
import { calendarButtonStyles, getIconClass, getWrapperClass } from './assistants';
import { useCalendarText } from './hooks';

import { SvgIcon } from 'ui';
import { CalendarContent } from './subcomponents';

const Calendar: FC<{ variant: CalendarVariant }> = ({ variant }) => {
  const { popUpRef, toggleCalendar, isOpenCalendar } = usePopUp();
  const { isReadActive } = useActiveLinks();
  const { showButtonText } = useCalendarText();

  const wrapperClass = getWrapperClass(isReadActive);
  const iconClass = getIconClass(isOpenCalendar);

  return (
    <div ref={popUpRef} className={wrapperClass}>
      <p className='text-base text-darkBase dark:text-greyAlt lg:text-medium'>
        {variant === CalendarVariant.Search ? 'Search' : 'Filter'} by Date or Date Period:
      </p>
      <button
        id='Toggle calendar button'
        type={ButtonType.Button}
        onClick={toggleCalendar}
        className={calendarButtonStyles}
      >
        <SvgIcon
          svgName={IconName.Calendar}
          sizeKey={IconSizes.smIcon20}
          className='fill-accentBase'
        />
        {showButtonText(variant)}
        <SvgIcon svgName={IconName.Arrow} sizeKey={IconSizes.xsIcon14} className={iconClass} />
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
