import { startOfToday } from 'date-fns';

import { useFiltersStateContext, useSelectedDateContext } from 'contexts';
import { convertDateStringToVariables, formatDateToString } from 'helpers';

const useCalendarText = () => {
  const { filters } = useFiltersStateContext();
  const { memoizedSelectedRequestDate } = useSelectedDateContext();

  const { beginDate, endDate } = memoizedSelectedRequestDate;
  const { startDate: firstFilteredDate, endDate: lastFilteredDate } = filters.selectedFilterDate;

  const today = startOfToday();

  const firstRequestDate = convertDateStringToVariables(beginDate);
  const lastRequestDate = convertDateStringToVariables(endDate);

  //Функція відображення дат в кнопці календаря
  const showButtonText = (variant: string): string => {
    const hasRequestPeriod = variant === 'SearchBlock' && !!beginDate && !!endDate;
    const hasFilterPeriod = variant === 'FiltersBlock' && !!firstFilteredDate && !!lastFilteredDate;

    switch (true) {
      case hasRequestPeriod:
        return `${firstRequestDate} - ${lastRequestDate}`;
      case hasFilterPeriod:
        return `${firstFilteredDate} - ${lastFilteredDate}`;

      default:
        return formatDateToString(today).dayMonthYear;
    }
  };

  return { showButtonText };
};

export default useCalendarText;
