export enum CalendarVariant {
  Search = 'SearchBlock',
  Filter = 'FiltersBlock',
}

export type ControlCalendar = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  amount: number,
) => void;
