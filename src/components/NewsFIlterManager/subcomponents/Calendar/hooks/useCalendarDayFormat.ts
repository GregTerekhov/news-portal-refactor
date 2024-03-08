import { format } from 'date-fns';

//Хук для разгрузки логики в компоненте GridCalendar
const useCalendarDayFormat = () => {
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

  return { dateToString };
};

export default useCalendarDayFormat;
