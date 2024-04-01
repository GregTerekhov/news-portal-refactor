import { useState } from 'react';
import { isAfter, startOfToday } from 'date-fns';

import { useFiltersStateContext, useSelectedDateContext } from 'contexts';

import type { SelectedDate } from 'types';

import { determineNewSelectedDate } from 'helpers';

const useFilterDateChange = () => {
  const [beginDate, setBeginDate] = useState<Date | null>(null);
  const today = startOfToday();

  const { filters, setFilters } = useFiltersStateContext();
  const { setSelectedFilterDate } = useSelectedDateContext();

  //Функція фільтрації по періоду дат
  const handleFilterDate = (
    date: Date,
    isOpenCalendar: boolean,
    toggleCalendar: () => void,
  ): void => {
    //Перевірка, якщо введена дата не пізніше сьогодняшньої
    if (!isAfter(date, today)) {
      //Перевірка, якщо немає початкової дати та її вставка в проміжковий стан початкової дати
      if (!beginDate) {
        setBeginDate(date);
      } else {
        try {
          //Нормалізація введених дат за послідовністю - спочатку ранішня дата, потім пізніша
          const newSelectedDate: SelectedDate = determineNewSelectedDate(date, beginDate, 'filter');

          //Додавання періода дат в об'єкт стану в контексті
          setSelectedFilterDate(newSelectedDate);

          //Перевірка на існування обох введених дат та зміна стану фільтрів для відображення значень дат
          if (newSelectedDate.beginDate && newSelectedDate.endDate) {
            setFilters({
              ...filters,
              selectedFilterDate: {
                startDate: newSelectedDate.beginDate,
                endDate: newSelectedDate.endDate,
              },
            });
            //Видалення значення проміжкового стану початкової дати
            setBeginDate(null);
          }
        } catch (error) {
          console.error('An error occurred while updating the values: ', error);
        } finally {
          //Закриття календаря
          if (isOpenCalendar) toggleCalendar();
        }
      }
    }
  };

  return { handleFilterDate };
};

export default useFilterDateChange;
