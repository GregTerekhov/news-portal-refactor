import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { format, startOfToday } from 'date-fns';

import { useFiltersState, useSelectedDate } from 'contexts';
import { useActiveLinks, usePopUp } from 'hooks';

import { SvgIcon } from 'ui';

import { useFilterNews } from '../FiltersBlock/hooks';
import { convertLinesForCalendar } from './assistants';
import { CalendarContent } from './subcomponents';

interface CalendarProps {
  variant: string;
}

const Calendar: FC<CalendarProps> = ({ variant }) => {
  const { popUpRef, toggleCalendar, isOpenCalendar, setIsOpenCalendar } = usePopUp();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { handleFilterDate } = useFilterNews({ activeLinks, setIsOpenCalendar });
  const { filters } = useFiltersState();
  const { selectedRequestDate } = useSelectedDate();

  const today = startOfToday();
  const showToday = selectedRequestDate.beginDate === null && selectedRequestDate.endDate === null;

  // console.log('CALENDAR', isOpenCalendar);

  return (
    <div ref={popUpRef} className={`relative ${activeLinks.isReadActive ? null : 'col-span-4'}`}>
      <p className='text-darkBase dark:text-greyAlt mb-2 text-base'>
        {variant === 'SearchBlock' ? 'Search' : 'Filter'} by Date or Date Period:
      </p>
      <button
        id='Toggle calendar button'
        type='button'
        onClick={toggleCalendar}
        className='w-full bg-whiteBase dark:bg-darkBackground rounded-[20px] border border-solid border-accentBase dark:border-greyBase text-accentBase dark:text-greyAlt flex justify-between items-center py-2 px-3 group-hover:text-whiteBase group-hover:bg-accentBase group-hover:border-whiteBase transition-colors text-small md:text-base leading-mediumRelaxed md:leading-moreRelaxed tracking-bigWide md:tracking-wider'
      >
        <SvgIcon svgName='icon-calendar' size={20} className='fill-accentBase' />
        {variant === 'SearchBlock' &&
        selectedRequestDate.beginDate !== null &&
        selectedRequestDate.endDate !== null &&
        !showToday
          ? `${convertLinesForCalendar(selectedRequestDate.beginDate)} - ${convertLinesForCalendar(
              selectedRequestDate.endDate,
            )}`
          : variant === 'FiltersBlock' &&
              filters &&
              filters.selectedFilterDate.startDate !== '' &&
              filters.selectedFilterDate.endDate !== ''
            ? `${filters.selectedFilterDate.startDate} - ${filters.selectedFilterDate.endDate}`
            : format(today, 'dd/MM/yyyy')}
        <SvgIcon
          svgName='icon-arrow-down'
          size={14}
          className={`fill-accentBase transition-transform ${
            isOpenCalendar ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      {!!isOpenCalendar && (
        <CalendarContent variant={variant} handleDateFilter={handleFilterDate} />
      )}
    </div>
  );
};

export default React.memo(Calendar);
