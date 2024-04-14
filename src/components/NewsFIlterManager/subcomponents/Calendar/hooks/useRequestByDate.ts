import { isAfter, startOfToday } from 'date-fns';

import type { SelectedDate } from 'types';
import { useNewsAPIRedux, useFiltersRedux } from 'reduxStore/hooks';
import { useFiltersStateContext, usePaginationContext, useSelectedDateContext } from 'contexts';

import { determineNewSelectedDate, formatDateRange } from 'helpers';

const useRequestByDate = () => {
  const { fetchByDate, resetPreviousRequest, updateHeadline } = useNewsAPIRedux();
  const { filteredNews, resetAllFiltersResults } = useFiltersRedux();

  const { beginDate, setBeginDate, setSelectedRequestDate, resetFiltersDay } =
    useSelectedDateContext();
  const { resetPagination } = usePaginationContext();
  const { resetFilters } = useFiltersStateContext();

  const today = startOfToday();

  //Функція запиту за періодом дат
  const handleDateRequest = async (
    date: Date,
    isOpenCalendar: boolean,
    toggleCalendar: () => void,
  ): Promise<void> => {
    //Перевірка, якщо введена дата не пізніше сьогодняшньої
    if (isAfter(date, today)) return;

    //Перевірка, якщо немає початкової дати та її вставка в проміжковий стан початкової дати
    if (!beginDate) {
      setBeginDate(date);
      return;
    } else {
      try {
        //Нормалізація введених дат за послідовністю - спочатку ранішня дата, потім пізніша
        const newSelectedDate: SelectedDate = determineNewSelectedDate(date, beginDate, 'request');

        //Додавання періода дат в об'єкт стану в контексті
        setSelectedRequestDate(newSelectedDate);

        //Функція конвертації дат для правильного запита
        const { firstDate, lastDate } = formatDateRange(newSelectedDate);

        //Створення заголовка для новин по періоду дат
        updateHeadline(`News by Date: from ${firstDate} to ${lastDate}`);

        //Скидання значення пагінації, якщо користувач знаходився не на першій сторінці пагінації
        resetPagination();

        //Скидання значень, якщо присутні фільтровані новини
        if (filteredNews?.length > 0) {
          resetPreviousRequest();
          resetFiltersDay();
          resetAllFiltersResults();
          resetFilters();
        }

        //Функція запиту
        await fetchByDate(newSelectedDate);

        //Видалення значення проміжкового стану початкової дати
        setBeginDate(null);
      } catch (error) {
        console.error('An error occurred while updating the values: ', error);
      } finally {
        //Закриття календаря
        if (isOpenCalendar) toggleCalendar();
      }
    }
  };

  return {
    handleDateRequest,
  };
};

export default useRequestByDate;
