import React, { FC } from 'react';
import { format, startOfToday } from 'date-fns';

import { ICON_SIZES } from 'constants/iconSizes';
import { useFiltersState, useSelectedDate } from 'contexts';
import { useActiveLinks, usePopUp } from 'hooks';

import { SvgIcon } from 'ui';

import { convertLinesForCalendar } from './assistants';
import { CalendarContent } from './subcomponents';

interface CalendarProps {
  variant: string;
}

const Calendar: FC<CalendarProps> = ({ variant }) => {
  const { popUpRef, toggleCalendar, isOpenCalendar } = usePopUp();
  const { filters } = useFiltersState();
  const { selectedRequestDate } = useSelectedDate();

  const activeLinks = useActiveLinks();

  const { isReadActive } = activeLinks;
  const today = startOfToday();

  const showSelectedDateForFiltering =
    filters &&
    filters.selectedFilterDate.startDate !== '' &&
    filters.selectedFilterDate.endDate !== '';

  const firstRequestDate =
    selectedRequestDate.beginDate && convertLinesForCalendar(selectedRequestDate.beginDate);
  const lastRequestDate =
    selectedRequestDate.endDate && convertLinesForCalendar(selectedRequestDate.endDate);
  const firstFilteredDate = filters.selectedFilterDate.startDate;
  const lastFilteredDate = filters.selectedFilterDate.endDate;

  const showButtonText = (variant: string): string => {
    let buttonContent = '';

    if (
      variant === 'SearchBlock' &&
      selectedRequestDate.beginDate !== null &&
      selectedRequestDate.endDate !== null
    ) {
      buttonContent = `${firstRequestDate} - ${lastRequestDate}`;
    } else if (variant === 'FiltersBlock' && showSelectedDateForFiltering) {
      buttonContent = `${firstFilteredDate} - ${lastFilteredDate}`;
    } else {
      buttonContent = format(today, 'dd/MM/yyyy');
    }

    return buttonContent;
  };

  const calendarButtonStyles =
    'w-full bg-whiteBase dark:bg-darkBackground rounded-[20px] border border-solid border-accentBase dark:border-greyBase text-accentBase dark:text-greyAlt flex justify-between items-center py-2 px-3 group-hover:text-whiteBase group-hover:bg-accentBase group-hover:border-whiteBase transition-colors text-small md:text-base leading-mediumRelaxed md:leading-moreRelaxed tracking-bigWide md:tracking-wider';

  return (
    <div ref={popUpRef} className={`relative ${isReadActive ? null : 'col-span-4'}`}>
      <p className='mb-2 text-base text-darkBase dark:text-greyAlt'>
        {variant === 'SearchBlock' ? 'Search' : 'Filter'} by Date or Date Period:
      </p>
      <button
        id='Toggle calendar button'
        type='button'
        onClick={toggleCalendar}
        className={`${calendarButtonStyles}`}
      >
        <SvgIcon svgName='icon-calendar' size={ICON_SIZES.smIcon20} className='fill-accentBase' />
        {showButtonText(variant)}
        <SvgIcon
          svgName='icon-arrow'
          size={ICON_SIZES.xsIcon14}
          className={`fill-accentBase transition-transform ${
            isOpenCalendar ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      {isOpenCalendar && <CalendarContent variant={variant} />}
    </div>
  );
};

export default React.memo(Calendar);
