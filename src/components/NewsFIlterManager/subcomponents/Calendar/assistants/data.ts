import type { ControlCalendar } from 'types';

enum ButtonKey {
  Year = 'year',
  Month = 'month',
}

type ButtonsBlock = {
  id: ButtonKey;
  onPrevClick: ControlCalendar;
  onNextClick: ControlCalendar;
  formattedDate: string;
};

export const getControlButtons = (
  year: string,
  month: string,
  handleChangeYear: ControlCalendar,
  handleChangeMonth: ControlCalendar,
): ButtonsBlock[] => {
  return [
    {
      id: ButtonKey.Year,
      onPrevClick: handleChangeYear,
      onNextClick: handleChangeYear,
      formattedDate: year,
    },
    {
      id: ButtonKey.Month,
      onPrevClick: handleChangeMonth,
      onNextClick: handleChangeMonth,
      formattedDate: month,
    },
  ];
};
