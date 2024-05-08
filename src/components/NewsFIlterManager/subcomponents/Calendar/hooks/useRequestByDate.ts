import { isAfter, startOfToday } from 'date-fns';

import type { DateRequest } from 'types';
import { useNewsAPIRedux, useFiltersRedux } from 'reduxStore/hooks';
import { useFiltersStateContext, usePaginationContext, useSelectedDateContext } from 'contexts';

import { determineNewSelectedDate, formatDateRange } from 'helpers';
import { TriggerType, useHeadline } from 'hooks';

const useRequestByDate = () => {
  const { fetchByDate, resetPreviousRequest } = useNewsAPIRedux();
  const { filteredNews, resetAllFiltersResults } = useFiltersRedux();

  const { beginRequestDate, setBeginRequestDate, setSelectedRequestDate, resetFiltersDay } =
    useSelectedDateContext();
  const { resetPagination } = usePaginationContext();
  const { resetFiltersState } = useFiltersStateContext();

  const { handleChangeHeadline } = useHeadline();
  const today = startOfToday();

  //Функція запиту за періодом дат
  const handleDateRequest = async (
    selectedDate: Date,
    isOpenCalendar: boolean,
    toggleCalendar: () => void,
  ): Promise<void> => {
    //Перевірка, якщо введена дата не пізніше сьогодняшньої
    if (isAfter(selectedDate, today)) return;

    //Перевірка, якщо немає початкової дати та її вставка в проміжковий стан початкової дати
    if (!beginRequestDate) {
      setBeginRequestDate(selectedDate);
    } else {
      try {
        //Нормалізація введених дат за послідовністю - спочатку ранішня дата, потім пізніша
        const selectedPeriod: DateRequest = determineNewSelectedDate(
          selectedDate,
          beginRequestDate,
          'request',
        );

        //Додавання періода дат в об'єкт стану в контексті
        setSelectedRequestDate(selectedPeriod);

        //Функція конвертації дат для правильного запита
        const dateToHeadline = formatDateRange(selectedPeriod);

        //Створення заголовка для новин по періоду дат
        handleChangeHeadline(TriggerType.Date, dateToHeadline);

        //Скидання значення пагінації, якщо користувач знаходився не на першій сторінці пагінації
        resetPagination();

        //Скидання значень, якщо присутні фільтровані новини
        if (filteredNews?.length > 0) {
          resetPreviousRequest();
          resetFiltersDay();
          resetAllFiltersResults();
          resetFiltersState();
        }

        //Функція запиту
        await fetchByDate(selectedPeriod);

        //Видалення значення проміжкового стану початкової дати
        setBeginRequestDate(null);
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
