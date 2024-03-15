import { isAfter, startOfToday } from 'date-fns';

import { useNewsAPI, useFiltersAction } from 'reduxStore/hooks';

import { useFiltersState, useSelectedDate } from 'contexts';
import { determineNewSelectedDate, formatDateRange } from 'helpers';
import { usePopUp } from 'hooks';

const useRequestByDate = () => {
  const { fetchByDate, resetPreviousRequest, updateHeadline } = useNewsAPI();
  const { beginDate, setBeginDate, setSelectedRequestDate } = useSelectedDate();
  const { toggleCalendar } = usePopUp();
  const { filteredNews, resetAllFilters } = useFiltersAction();
  const { setSelectedFilterDate } = useSelectedDate();

  const { setFilters, filters } = useFiltersState();

  const today = startOfToday();

  const handleDateRequest = async (date: Date) => {
    if (isAfter(date, today)) {
      return;
    } else {
      if (beginDate) {
        try {
          const newSelectedDate = determineNewSelectedDate(date, beginDate, 'request');

          setSelectedRequestDate(newSelectedDate);

          const { firstDate, lastDate } = formatDateRange(newSelectedDate);

          updateHeadline(`News by Date: from ${firstDate} to ${lastDate}`);

          const newDateValues = Object.values(newSelectedDate);

          if (newDateValues !== null) {
            if (filteredNews && filteredNews.length > 0) {
              resetPreviousRequest();
              setSelectedFilterDate({ beginDate: null, endDate: null });
              resetAllFilters();
              setFilters({
                ...filters,
                selectedFilterDate: {
                  startDate: '',
                  endDate: '',
                },
              });

              console.log(`WORK`);

              await fetchByDate(newSelectedDate);
            } else {
              await fetchByDate(newSelectedDate);
            }
            setBeginDate(null);
            toggleCalendar(); // не працює
          }
        } catch (error) {
          console.error('Помилка при зміні значень:', error);
        }
      } else {
        setBeginDate(date);
      }
    }
  };

  return {
    handleDateRequest,
  };
};

export default useRequestByDate;
