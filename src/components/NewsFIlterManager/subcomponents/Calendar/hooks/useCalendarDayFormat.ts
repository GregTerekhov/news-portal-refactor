import { useSelectedDate } from 'contexts/SelectedDateProvider';
import { format } from 'date-fns';

//Хук для разгрузки логики в компоненте GridCalendar
const useCalendarDayFormat = () => {
  const { setSelectedFilterDate } = useSelectedDate();

  //Принимает день и вариант календаря: поиск, фильтр. Приводит день к формату
  const dateToString = (day: number | Date, variant: string) => {
    let dayToString: string = '';

    switch (variant) {
      case 'SearchBlock':
        dayToString = format(day, 'yyyyMMdd');
        break;
      case 'FiltersBlock':
        dayToString = format(day, 'dd/MM/yyyy');
        break;
      default:
        break;
    }
    return dayToString;
  };

  const isDayInRange = (beginDate: string | null, endDate: string | null, selectedDate: string) => {
    const isDayInRange =
      beginDate && endDate && beginDate <= selectedDate && endDate >= selectedDate;

    return isDayInRange;
  };

  const resetFiltersDay = () => {
    setSelectedFilterDate({ beginDate: null, endDate: null });
  };

  const dayFormatConverter = (filterDate: string) => {
    const chopTheDay = filterDate.slice(0, 2);
    const chopTheMonth = filterDate.slice(3, 5);
    const chopTheYear = filterDate.slice(6);

    const sewTogether = chopTheYear + chopTheMonth + chopTheDay;

    return sewTogether;
  };

  return { dateToString, isDayInRange, resetFiltersDay, dayFormatConverter };
};

export default useCalendarDayFormat;
