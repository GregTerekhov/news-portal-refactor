function receiveCurrentTime() {
  const currentTime = new Date();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const formatTimeUnit = (timeUnit: number) => {
    return timeUnit < 10 ? `0${timeUnit}` : timeUnit.toString();
  };

  const formattedHours = formatTimeUnit(hours);
  const formattedMinutes = formatTimeUnit(minutes);

  return `${formattedHours}:${formattedMinutes}`;
}

export function receiveCurrentDate() {
  const today = new Date();
  const currentTime = receiveCurrentTime();
  const days = today.toDateString().slice(0, 3);
  const month = today.toDateString().slice(4).slice(0, 4);
  const number = today.toDateString().slice(8).slice(0, 2);
  const year = today.toDateString().slice(11);
  const formattedDate = `${currentTime} ${number} ${month} ${year}`;

  return { days, dateNow: formattedDate };
}

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

export function formatDateString(dateString: string) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}
