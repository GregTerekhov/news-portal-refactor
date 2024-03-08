import { isAfter, startOfToday } from 'date-fns';

import { useNewsAPI, useFiltersAction } from 'reduxStore/hooks';

import { useSelectedDate } from 'contexts';

import { determineNewSelectedDate } from 'helpers';
import { usePopUp } from 'hooks';

import { formatDateRange } from '../assistants';

const useRequestByDate = () => {
  const { fetchByDate, resetPreviousRequest, updateHeadline } = useNewsAPI();
  const { beginDate, setBeginDate, setSelectedRequestDate } = useSelectedDate();
  const { closeCalendar } = usePopUp();
  const { filteredNews } = useFiltersAction();

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
              await fetchByDate(newSelectedDate);
            } else {
              await fetchByDate(newSelectedDate);
            }
            setBeginDate(null);
            closeCalendar(false); // не працює
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
