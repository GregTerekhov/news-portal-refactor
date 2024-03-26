import React, { FC } from 'react';
import { format, startOfToday } from 'date-fns';

import { useFiltersState, useSelectedDate } from 'contexts';

import { convertDateStringToVariables } from 'helpers';
import { useActiveLinks, usePopUp } from 'hooks';

import { SvgIcon } from 'ui';

import { CalendarContent } from './subcomponents';

interface CalendarProps {
  variant: string;
}

const Calendar: FC<CalendarProps> = ({ variant }) => {
  const { filters } = useFiltersState();
  const { memoizedSelectedRequestDate } = useSelectedDate();

  const { popUpRef, toggleCalendar, isOpenCalendar } = usePopUp();
  const { isReadActive } = useActiveLinks();

  const { beginDate, endDate } = memoizedSelectedRequestDate;

  const today = startOfToday();

  const showSelectedDateForFiltering =
    filters?.selectedFilterDate?.startDate !== '' && filters?.selectedFilterDate?.endDate !== '';

  const firstRequestDate = !!beginDate && convertDateStringToVariables(beginDate);
  const lastRequestDate = !!endDate && convertDateStringToVariables(endDate);
  const firstFilteredDate = filters.selectedFilterDate.startDate;
  const lastFilteredDate = filters.selectedFilterDate.endDate;

  const showButtonText = (variant: string): string => {
    if (variant === 'SearchBlock' && beginDate && endDate) {
      return `${firstRequestDate} - ${lastRequestDate}`;
    }
    if (variant === 'FiltersBlock' && showSelectedDateForFiltering) {
      return `${firstFilteredDate} - ${lastFilteredDate}`;
    }
    return format(today, 'dd/MM/yyyy');
  };

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
