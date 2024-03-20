import { isAfter, startOfToday } from 'date-fns';

import { useNewsAPI, useFiltersAction } from 'reduxStore/hooks';
import { useFiltersState, usePaginationContext, useSelectedDate } from 'contexts';

import type { SelectedDate } from 'types';

import { determineNewSelectedDate, formatDateRange } from 'helpers';

const useRequestByDate = () => {
  const { fetchByDate, resetPreviousRequest, updateHeadline } = useNewsAPI();
  const { filteredNews, resetAllFiltersResults } = useFiltersAction();

  const { beginDate, setBeginDate, setSelectedRequestDate } = useSelectedDate();
  const { resetFiltersDay } = useSelectedDate();
  const { resetPagination } = usePaginationContext();
  const { resetFilters } = useFiltersState();

  const today = startOfToday();

  const handleDateRequest = async (
    date: Date,
    isOpenCalendar: boolean,
    toggleCalendar: () => void,
  ): Promise<void> => {
    if (isAfter(date, today)) return;

    if (!beginDate) {
      setBeginDate(date);
      return;
    } else {
      try {
        const newSelectedDate: SelectedDate = determineNewSelectedDate(date, beginDate, 'request');

        setSelectedRequestDate(newSelectedDate);

        const { firstDate, lastDate } = formatDateRange(newSelectedDate);

        updateHeadline(`News by Date: from ${firstDate} to ${lastDate}`);
        resetPagination();

        if (filteredNews?.length > 0) {
          resetPreviousRequest();
          resetFiltersDay();
          resetAllFiltersResults();
          resetFilters();
        }

        await fetchByDate(newSelectedDate);
        if (isOpenCalendar) toggleCalendar();

        setBeginDate(null);
      } catch (error) {
        console.error('An error occurred while updating the values: ', error);
      }
    }
  };

  return {
    handleDateRequest,
  };
};

export default useRequestByDate;
