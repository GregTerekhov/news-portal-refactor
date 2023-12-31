export function capitalizeFirstLetter(str: string) {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertLinesForCalendar(dateStr: string) {
  // Розбиваємо рядок на компоненти
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  // Формуємо рядок у бажаному форматі
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
