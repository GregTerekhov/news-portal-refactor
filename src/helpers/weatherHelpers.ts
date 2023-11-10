export function convertTimezone(data: any) {
  const zoneList: any = {
    '-43200': '-12:00',
    '-39600': '-11:00',
    '-36000': '-10:00',
    '-34200': '-09:30',
    '-32400': '-09:00',
    '-28800': '-08:00',
    '-25200': '-07:00',
    '-21600': '-06:00',
    '-18000': '-05:00',
    '-16200': '-04:30',
    '-14400': '-04:00',
    '-12600': '-03:30',
    '-10800': '-03:00',
    '-7200': '-02:00',
    '-3600': '-01:00',
    '0': '00:00',
    '3600': '+01:00',
    '7200': '+02:00',
    '10800': '+03:00',
    '12600': '+03:30',
    '14400': '+04:00',
    '16200': '+04:30',
    '18000': '+05:00',
    '19800': '+05:30',
    '20700': '+05:45',
    '21600': '+06:00',
    '23400': '+06:30',
    '25200': '+07:00',
    '28800': '+08:00',
    '32400': '+09:00',
    '34200': '+09:30',
    '36000': '+10:00',
    '37800': '+10:30',
    '39600': '+11:00',
    '41400': '+11:30',
    '43200': '+12:00',
    '45900': '+12:45',
    '46800': '+13:00',
    '50400': '+14:00',
  };

  const convert = zoneList[data];
  return convert;
}

export function hPaToMmHg(hPa: number) {
  const mmHg = hPa * 0.75006;
  const formattedMmHg = Math.floor(mmHg);

  return formattedMmHg;
}

export function formatKmToMetre(distance: number) {
  return distance / 1000;
}

export function getWindStrengthScale(windSpeed: number) {
  let interval;
  // Шкала Бофорта з відповідними інтервалами швидкостей вітру
  const beaufortScale = [
    { min: 0, max: 0.2, scale: '0' }, // Штиль
    { min: 0.3, max: 1.5, scale: '1' }, // Легкий вітер
    { min: 1.6, max: 3.3, scale: '2' }, // Слабкий вітер
    { min: 3.4, max: 5.4, scale: '3' }, // Слабкий бриз
    { min: 5.5, max: 7.9, scale: '4' }, // Слабий бриз
    { min: 8.0, max: 10.7, scale: '5' }, // Помірний бриз
    { min: 10.8, max: 13.8, scale: '6' }, // Помірний вітер
    { min: 13.9, max: 17.1, scale: '7' }, // Сильний вітер
    { min: 17.2, max: 20.7, scale: '8' }, // Сильний вітер (шторм)
    { min: 20.8, max: 24.4, scale: '9' }, // Сильний вітер (шторм)
    { min: 24.5, max: 28.4, scale: '10' }, // Шторм
    { min: 28.5, max: 32.6, scale: '11' }, // Сильний шторм
    { min: 32.7, max: Number.MAX_SAFE_INTEGER, scale: '12' }, // Ураган
  ];

  if (windSpeed) {
    // Знаходимо відповідний інтервал вітрової швидкості в шкалі Бофорта
    interval = beaufortScale.find((range) => windSpeed >= range.min && windSpeed <= range.max);
  }

  // Повертаємо відповідну іконку або значення за замовчуванням
  return interval ? interval?.scale : '';
}
