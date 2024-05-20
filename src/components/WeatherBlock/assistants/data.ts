import { ReactElement } from 'react';

import {
  IconName,
  IconSizes,
  WeatherSubtext,
  WeatherTableAriaLabel,
  type HintText,
  type HourlyWeatherData,
  type WeatherData,
} from 'types';

import { getWeatherTodayObject } from './rebuiltWeatherObject';

import {
  RenderTemperatureCell,
  RenderWeatherIconCell,
  RenderHumidityCell,
  RenderPressureCell,
  RenderWindSpeedCell,
} from '../subcomponents';

interface DetailsRows {
  icon: IconName;
  iconSize: IconSizes;
  value: string | number;
  ariaLabel: WeatherTableAriaLabel;
  hint: HintText;
  justifyItemClass: string;
  subTextValue: WeatherSubtext;
}

interface TableRows {
  hint: HintText;
  ariaLabel: WeatherTableAriaLabel;
  icon: IconName;
  iconSize: IconSizes;
  iconColorStyles: string;
  renderCell: (item: HourlyWeatherData, isCelsius: boolean) => ReactElement;
}

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
      icon: IconName.Earth,
      iconSize: isMobile ? IconSizes.xsIcon16 : IconSizes.mdIcon24,
      value: timezone ?? '',
      ariaLabel: WeatherTableAriaLabel.Timezone,
      hint: 'GMT time',
      justifyItemClass: 'justify-start',
      subTextValue: WeatherSubtext.Timezone,
    },
    {
      icon: IconName.Humidity,
      iconSize: isMobile ? IconSizes.smIcon18 : IconSizes.lgIcon30,
      value: humidityPercent,
      ariaLabel: WeatherTableAriaLabel.Humidity,
      hint: 'Humidity (%)',
      justifyItemClass: 'justify-end',
      subTextValue: WeatherSubtext.Humidity,
    },
    {
      icon: IconName.Pressure,
      iconSize: isMobile ? IconSizes.smIcon18 : IconSizes.lgIcon30,
      value: pressureMmHg,
      ariaLabel: WeatherTableAriaLabel.PressureMmHg,
      hint: 'Atmospheric pressure (mm.Hg)',
      justifyItemClass: 'justify-start',
      subTextValue: WeatherSubtext.PressureMmHg,
    },
    {
      icon: IconName.Pressure,
      iconSize: isMobile ? IconSizes.smIcon18 : IconSizes.lgIcon30,
      value: pressureHpa,
      ariaLabel: WeatherTableAriaLabel.PressureHPa,
      hint: 'Atmospheric pressure (HPa)',
      justifyItemClass: 'justify-end',
      subTextValue: WeatherSubtext.PressureHPa,
    },
    {
      icon: IconName.Sunrise,
      iconSize: isMobile ? IconSizes.smIcon20 : IconSizes.lgIcon30,
      value: sunriseTime,
      ariaLabel: WeatherTableAriaLabel.Sunrise,
      hint: 'Sunrise time',
      justifyItemClass: 'justify-start',
      subTextValue: WeatherSubtext.Sunrise,
    },
    {
      icon: IconName.Sunset,
      iconSize: isMobile ? IconSizes.smIcon20 : IconSizes.lgIcon30,
      value: sunsetTime,
      ariaLabel: WeatherTableAriaLabel.Sunset,
      hint: 'Sunset time',
      justifyItemClass: 'justify-end',
      subTextValue: WeatherSubtext.Sunset,
    },
    {
      icon: IconName.OpenedEye,
      iconSize: isMobile ? IconSizes.smIcon20 : IconSizes.lgIcon30,
      value: visibility,
      ariaLabel: WeatherTableAriaLabel.Visibility,
      hint: 'Road visibility',
      justifyItemClass: 'justify-start',
      subTextValue: WeatherSubtext.Visibility,
    },
    {
      icon: IconName.WindSpeed,
      iconSize: isMobile ? IconSizes.smIcon20 : IconSizes.lgIcon30,
      value: windSpeed,
      ariaLabel: WeatherTableAriaLabel.WindSpeed,
      hint: `Wind speed (m/s). (${beaufortScale} on the Beaufort scale)`,
      justifyItemClass: 'justify-end',
      subTextValue: WeatherSubtext.WindSpeed,
    },
  ];

  return weatherDetails;
};

export const getWeatherTableForHours = (isCelsius: boolean): TableRows[] => {
  const rows: TableRows[] = [
    {
      hint: `Temperature in °${isCelsius ? 'C' : 'F'}`,
      ariaLabel: WeatherTableAriaLabel.Temperature,
      icon: IconName.Thermometer,
      iconSize: IconSizes.mdIcon24,
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderTemperatureCell,
    },
    {
      hint: 'Precipitation and weather',
      ariaLabel: WeatherTableAriaLabel.CurrentWeather,
      icon: IconName.Sun,
      iconSize: IconSizes.mdIcon24,
      iconColorStyles: 'stroke-whiteBase fill-transparent',
      renderCell: RenderWeatherIconCell,
    },
    {
      hint: 'Humidity (%)',
      ariaLabel: WeatherTableAriaLabel.Humidity,
      icon: IconName.Humidity,
      iconSize: IconSizes.mdIcon28,
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderHumidityCell,
    },
    {
      hint: 'Atmospheric pressure (mm.Hg)',
      ariaLabel: WeatherTableAriaLabel.PressureMmHg,
      icon: IconName.Pressure,
      iconSize: IconSizes.mdIcon24,
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderPressureCell,
    },
    {
      hint: 'Wind speed (m/s)',
      ariaLabel: WeatherTableAriaLabel.WindSpeed,
      icon: IconName.WindSpeed,
      iconSize: IconSizes.mdIcon24,
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderWindSpeedCell,
    },
  ];

  return rows;
};
