import { useState } from 'react';
import { isAfter, startOfToday } from 'date-fns';

import { useFiltersState, useSelectedDate } from 'contexts';
import { determineNewSelectedDate } from 'helpers';

const useFilterDateChange = () => {
  const [beginDate, setBeginDate] = useState<Date | null>(null);
  const today = startOfToday();

  const { filters, setFilters } = useFiltersState();
  const { setSelectedFilterDate } = useSelectedDate();

  const handleFilterDate = (date: Date): void => {
    if (!isAfter(date, today)) {
      if (!beginDate) {
        setBeginDate(date);
      } else {
        try {
          const newSelectedDate = determineNewSelectedDate(date, beginDate, 'filter');
          setSelectedFilterDate(newSelectedDate);

          if (newSelectedDate.beginDate && newSelectedDate.endDate) {
            setFilters({
              ...filters,
              selectedFilterDate: {
                startDate: newSelectedDate.beginDate,
                endDate: newSelectedDate.endDate,
              },
            });
            setBeginDate(null);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return { handleFilterDate };
};

export default useFilterDateChange;
