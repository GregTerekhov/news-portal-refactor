import { format } from 'date-fns';

//Хук для разгрузки логики в компоненте GridCalendar
const useCalendarDayFormat = () => {
  //Принимает день и вариант календаря: поиск, фильтр. Приводит день к формату
  const dateToString = (day: Date, variant: string): string => {
    let dayToString = '';

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

  const dayFormatConverter = (filterDate: string): string => {
    const chopTheDay = filterDate.slice(0, 2);
    const chopTheMonth = filterDate.slice(3, 5);
    const chopTheYear = filterDate.slice(6);

    const sewTogether = chopTheYear + chopTheMonth + chopTheDay;

    return sewTogether;
  };

  return { dateToString, isDayInRange, dayFormatConverter };
};

export default useCalendarDayFormat;
