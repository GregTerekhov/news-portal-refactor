import { isAfter, startOfToday } from 'date-fns';

import type { DateRequest } from 'types';

import { useFiltersStateContext, useSelectedDateContext } from 'contexts';

import { DatePosition, determineNewSelectedDate } from 'helpers';

const useFilterDateChange = () => {
  const today = startOfToday();

  const { filters, setFilters } = useFiltersStateContext();
  const { beginFilterDate, setBeginFilterDate, setSelectedFilterDate } = useSelectedDateContext();

  //Функція фільтрації по періоду дат
  const handleFilterDate = (
    selectedDate: Date,
    isOpenCalendar: boolean,
    toggleCalendar: () => void,
  ): void => {
    //Перевірка, якщо введена дата не пізніше сьогодняшньої
    if (isAfter(selectedDate, today)) return;

    //Перевірка, якщо немає початкової дати та її вставка в проміжковий стан початкової дати
    if (!beginFilterDate) {
      setBeginFilterDate(selectedDate);
    } else {
      try {
        //Нормалізація введених дат за послідовністю - спочатку ранішня дата, потім пізніша
        const selectedPeriod: DateRequest = determineNewSelectedDate(
          selectedDate,
          beginFilterDate,
          DatePosition.Filter,
        );

        //Додавання періода дат в об'єкт стану в контексті
        setSelectedFilterDate(selectedPeriod);

        const { beginDate: firstDate, endDate: lastDate } = selectedPeriod;

        //Перевірка на існування обох введених дат та зміна стану фільтрів для відображення значень дат
        if (firstDate && lastDate) {
          setFilters({
            ...filters,
            selectedFilterDate: {
              startDate: firstDate,
              endDate: lastDate,
            },
          });
          //Видалення значення проміжкового стану початкової дати
          setBeginFilterDate(null);
        }
      } catch (error) {
        console.error('An error occurred while updating the filter date values: ', error);
      } finally {
        //Закриття календаря
        if (isOpenCalendar) toggleCalendar();
      }
    }
  };

  return { handleFilterDate };
};

export default useFilterDateChange;
