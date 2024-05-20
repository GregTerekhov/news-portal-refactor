import { isAfter, startOfToday } from 'date-fns';

import { TriggerType, type DateRequest } from 'types';

import { useNewsAPIRedux, useFiltersRedux } from 'reduxStore/hooks';
import { useFiltersStateContext, usePaginationContext, useSelectedDateContext } from 'contexts';

import { DatePosition, determineNewSelectedDate, formatDateRange } from 'helpers';
import { useHeadline } from 'hooks';

const useRequestByDate = () => {
  const { fetchByDate, resetPreviousRequest } = useNewsAPIRedux();
  const { filteredNews, resetAllFiltersResults } = useFiltersRedux();
  const { beginRequestDate, setBeginRequestDate, setSelectedRequestDate, resetFiltersDay } =
    useSelectedDateContext();
  const { resetPagination } = usePaginationContext();
  const { resetFiltersState } = useFiltersStateContext();

  const { handleChangeHeadline } = useHeadline();
  const today = startOfToday();

  const reset = (): void => {
    resetPagination();

    if (filteredNews?.length > 0) {
      resetPreviousRequest();
      resetFiltersDay();
      resetAllFiltersResults();
      resetFiltersState();
    }
  };

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
          DatePosition.Request,
        );

        //Додавання періода дат в об'єкт стану в контексті
        setSelectedRequestDate(selectedPeriod);

        //Функція конвертації дат для правильного запита
        const dateToHeadline = formatDateRange(selectedPeriod);

        //Створення заголовка для новин по періоду дат
        handleChangeHeadline(TriggerType.Date, dateToHeadline);

        //Скидання значень, якщо присутні фільтровані новини і якщо користувач знаходився не на першій сторінці пагінації
        reset();

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
