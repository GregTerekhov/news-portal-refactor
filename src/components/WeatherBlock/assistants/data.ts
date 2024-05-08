import { ReactElement } from 'react';

import type { HourlyWeatherData, WeatherData } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';

import { getWeatherTodayObject } from './utils';

import {
  RenderTemperatureCell,
  RenderWeatherIconCell,
  RenderHumidityCell,
  RenderPressureCell,
  RenderWindSpeedCell,
} from '../subcomponents';

type DetailsRows = {
  icon: string;
  iconSize: keyof typeof ICON_SIZES;
  value: string | number;
  label: string;
  hint: string;
  justifyItemClass: string;
  subTextValue: string;
};

type TableRows = {
  label: string;
  icon: string;
  iconSize: keyof typeof ICON_SIZES;
  iconColorStyles: string;
  renderCell: (item: HourlyWeatherData, isCelsius: boolean) => ReactElement;
};

export const getWeatherDetailsForToday = (
  isMobile: boolean | undefined,
  currentWeather: WeatherData,
): DetailsRows[] => {
  const {
    timezone,
    humidityPercent,
    pressureHpa,
    pressureMmHg,
    sunriseTime,
    sunsetTime,
    visibility,
    windSpeed,
    beaufortScale,
  } = getWeatherTodayObject(currentWeather);

  const weatherDetails: DetailsRows[] = [
    {
      icon: 'earth',
      iconSize: isMobile ? 'xsIcon16' : 'mdIcon24',
      value: timezone ?? '',
      label: 'Greenwich mean time',
      hint: 'GMT time',
      justifyItemClass: 'justify-start',
      subTextValue: 'UTC',
    },
    {
      icon: 'humidity',
      iconSize: isMobile ? 'smIcon18' : 'lgIcon30',
      value: humidityPercent,
      label: 'Humidity in percent',
      hint: 'Humidity (%)',
      justifyItemClass: 'justify-end',
      subTextValue: '%',
    },
    {
      icon: 'pressure',
      iconSize: isMobile ? 'smIcon18' : 'lgIcon30',
      value: pressureMmHg,
      label: 'Atmospheric pressure in mm Hg',
      hint: 'Atmospheric pressure (mm.Hg)',
      justifyItemClass: 'justify-start',
      subTextValue: 'mm.Hg',
    },
    {
      icon: 'pressure',
      iconSize: isMobile ? 'smIcon18' : 'lgIcon30',
      value: pressureHpa,
      label: 'Atmospheric pressure in hPa',
      hint: 'Atmospheric pressure (HPa)',
      justifyItemClass: 'justify-end',
      subTextValue: 'hPa',
    },
    {
      icon: 'sunrise',
      iconSize: isMobile ? 'smIcon20' : 'lgIcon30',
      value: sunriseTime,
      label: 'Sunrise time',
      hint: 'Sunrise time',
      justifyItemClass: 'justify-start',
      subTextValue: 'AM',
    },
    {
      icon: 'sunset',
      iconSize: isMobile ? 'smIcon20' : 'lgIcon30',
      value: sunsetTime,
      label: 'Sunset time',
      hint: 'Sunset time',
      justifyItemClass: 'justify-end',
      subTextValue: 'PM',
    },
    {
      icon: 'eye-opened',
      iconSize: isMobile ? 'smIcon20' : 'lgIcon30',
      value: visibility,
      label: 'Road visibility',
      hint: 'Road visibility',
      justifyItemClass: 'justify-start',
      subTextValue: 'km',
    },
    {
      icon: 'weather-wind',
      iconSize: isMobile ? 'smIcon20' : 'lgIcon30',
      value: windSpeed,
      label: 'Wind speed in metre per seconds',
      hint: `Wind speed (m/s). (${beaufortScale} on the Beaufort scale)`,
      justifyItemClass: 'justify-end',
      subTextValue: 'm/s',
    },
  ];

  return weatherDetails;
};

export const getWeatherTableForHours = (isCelsius: boolean): TableRows[] => {
  const rows: TableRows[] = [
    {
      label: `Temperature in °${isCelsius ? 'C' : 'F'}`,
      icon: 'thermometer',
      iconSize: 'mdIcon24',
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderTemperatureCell,
    },
    {
      label: 'Precipitation and weather',
      icon: 'sun',
      iconSize: 'mdIcon24',
      iconColorStyles: 'stroke-whiteBase fill-transparent',
      renderCell: RenderWeatherIconCell,
    },
    {
      label: 'Humidity (%)',
      icon: 'humidity',
      iconSize: 'mdIcon28',
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderHumidityCell,
    },
    {
      label: 'Pressure (mm.Hg)',
      icon: 'pressure',
      iconSize: 'mdIcon24',
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderPressureCell,
    },
    {
      label: 'Wind speed (m/s)',
      icon: 'weather-wind',
      iconSize: 'mdIcon24',
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderWindSpeedCell,
    },
  ];

  return rows;
};
