import { startOfToday } from 'date-fns';

import { useFiltersStateContext, useSelectedDateContext } from 'contexts';
import { convertDateStringToVariables, formatDateToString } from 'helpers';

const useCalendarText = () => {
  const { filters } = useFiltersStateContext();
  const { memoizedSelectedRequestDate } = useSelectedDateContext();

  const { beginDate, endDate } = memoizedSelectedRequestDate;

  const showSelectedDateForFiltering: boolean =
    filters?.selectedFilterDate?.startDate !== '' && filters?.selectedFilterDate?.endDate !== '';

  const today = startOfToday();

  const firstRequestDate = !!beginDate && convertDateStringToVariables(beginDate);
  const lastRequestDate = !!endDate && convertDateStringToVariables(endDate);
  const firstFilteredDate = filters.selectedFilterDate.startDate;
  const lastFilteredDate = filters.selectedFilterDate.endDate;

  //Функція відображення дат в кнопці календаря
  const showButtonText = (variant: string): string => {
    if (variant === 'SearchBlock' && beginDate && endDate) {
      return `${firstRequestDate} - ${lastRequestDate}`;
    }
    if (variant === 'FiltersBlock' && showSelectedDateForFiltering) {
      return `${firstFilteredDate} - ${lastFilteredDate}`;
    }
    return formatDateToString(today).dayMonthYear;
  };

  return { showButtonText };
};

export default useCalendarText;
