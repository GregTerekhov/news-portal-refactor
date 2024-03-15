import { ReactElement } from 'react';

import { HourlyWeatherData, WeatherData } from 'types';

import { ICON_SIZES } from 'constants/iconSizes';

import {
  convertTimezone,
  convertUnixTimestampToHHMM,
  formatKmToMetre,
  getWindStrengthScale,
  hPaToMmHg,
} from './utils';

import {
  RenderTemperatureCell,
  RenderWeatherIconCell,
  RenderHumidityCell,
  RenderPressureCell,
  RenderWindSpeedCell,
} from '../subcomponents';

type DetailsRows = {
  icon: string;
  iconSize: number;
  value: string;
  label: string;
  hint: string;
  justifyItemClass: string;
  subTextValue: string;
};

type TableRows = {
  label: string;
  icon: string;
  iconSize: number;
  iconColorStyles: string;
  renderCell: (item: HourlyWeatherData) => ReactElement;
};

export const getWeatherDetailsForToday = (
  isMobile: boolean | undefined,
  currentWeather: WeatherData,
): DetailsRows[] => {
  const weatherDetails: DetailsRows[] = [
    {
      icon: 'earth',
      iconSize: isMobile ? ICON_SIZES.xsIcon16 : ICON_SIZES.mdIcon24,
      value: `${convertTimezone(currentWeather?.timezone)}`,
      label: 'Greenwich mean time',
      hint: 'GMT time',
      justifyItemClass: 'justify-start',
      subTextValue: 'UTC',
    },
    {
      icon: 'humidity',
      iconSize: isMobile ? ICON_SIZES.smIcon18 : ICON_SIZES.lgIcon30,
      value: `${currentWeather?.main?.humidity}`,
      label: 'Humidity in percent',
      hint: 'Humidity (%)',
      justifyItemClass: 'justify-end',
      subTextValue: '%',
    },
    {
      icon: 'pressure',
      iconSize: isMobile ? ICON_SIZES.smIcon18 : ICON_SIZES.lgIcon30,
      value: `${hPaToMmHg(currentWeather?.main?.pressure)}`,
      label: 'Atmospheric pressure in mm Hg',
      hint: 'Atmospheric pressure (mm.Hg)',
      justifyItemClass: 'justify-start',
      subTextValue: 'mm.Hg',
    },
    {
      icon: 'pressure',
      iconSize: isMobile ? ICON_SIZES.smIcon18 : ICON_SIZES.lgIcon30,
      value: `${currentWeather?.main?.pressure}`,
      label: 'Atmospheric pressure in hPa',
      hint: 'Atmospheric pressure (HPa)',
      justifyItemClass: 'justify-end',
      subTextValue: 'hPa',
    },
    {
      icon: 'sunrise',
      iconSize: isMobile ? ICON_SIZES.smIcon20 : ICON_SIZES.lgIcon30,
      value: `${convertUnixTimestampToHHMM(currentWeather?.sys?.sunrise)}`,
      label: 'Sunrise time',
      hint: 'Sunrise time',
      justifyItemClass: 'justify-start',
      subTextValue: 'AM',
    },
    {
      icon: 'sunset',
      iconSize: isMobile ? ICON_SIZES.smIcon20 : ICON_SIZES.lgIcon30,
      value: `${convertUnixTimestampToHHMM(currentWeather?.sys?.sunset)}`,
      label: 'Sunset time',
      hint: 'Sunset time',
      justifyItemClass: 'justify-end',
      subTextValue: 'PM',
    },
    {
      icon: 'eye-opened',
      iconSize: isMobile ? ICON_SIZES.smIcon20 : ICON_SIZES.lgIcon30,
      value: `${formatKmToMetre(currentWeather?.visibility)}`,
      label: 'Road visibility',
      hint: 'Road visibility',
      justifyItemClass: 'justify-start',
      subTextValue: 'km',
    },
    {
      icon: 'weather-wind',
      iconSize: isMobile ? ICON_SIZES.smIcon20 : ICON_SIZES.lgIcon30,
      value: `${currentWeather?.wind?.speed}`,
      label: 'Wind speed in metre per seconds',
      hint: `Wind speed (m/s). (${getWindStrengthScale(
        currentWeather?.wind?.speed,
      )} on the Beaufort scale)`,
      justifyItemClass: 'justify-end',
      subTextValue: 'm/s',
    },
  ];

  return weatherDetails;
};

export const getWeatherTableForHours = (): TableRows[] => {
  const rows: TableRows[] = [
    {
      label: 'Temperature in °C',
      icon: 'thermometer',
      iconSize: ICON_SIZES.mdIcon24,
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderTemperatureCell,
    },
    {
      label: 'Precipitation and weather',
      icon: 'sun',
      iconSize: ICON_SIZES.mdIcon24,
      iconColorStyles: 'stroke-whiteBase fill-transparent',
      renderCell: RenderWeatherIconCell,
    },
    {
      label: 'Humidity (%)',
      icon: 'humidity',
      iconSize: ICON_SIZES.mdIcon28,
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderHumidityCell,
    },
    {
      label: 'Pressure (mm.Hg)',
      icon: 'pressure',
      iconSize: ICON_SIZES.mdIcon24,
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderPressureCell,
    },
    {
      label: 'Wind speed (m/s)',
      icon: 'weather-wind',
      iconSize: ICON_SIZES.mdIcon24,
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderWindSpeedCell,
    },
  ];

  return rows;
};
