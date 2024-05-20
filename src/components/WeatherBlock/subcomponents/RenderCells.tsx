import React from 'react';

import type { HourlyWeatherData } from 'types';

import { Config, CONFIG } from 'config';

import { getWeatherHoursObject } from '../assistants';

const { WEATHER_ICON_URL }: Config = CONFIG;

const cellCommonStyles =
  'py-1.5 text-center text-small text-whiteBase md:py-4 md:text-base hg:text-medium';

//Компонент виведення значення температур
export const RenderTemperatureCell = (item: HourlyWeatherData, isCelsius: boolean): JSX.Element => {
  const { mainTemperature } = getWeatherHoursObject(item, isCelsius);

  return <td className={cellCommonStyles}>{mainTemperature}</td>;
};

//Компонент виведення відповідних іконок погоди
export const RenderWeatherIconCell = (item: HourlyWeatherData): JSX.Element => {
  const { iconWeather, iconAlt } = getWeatherHoursObject(item);

  return (
    <td className='h-35px'>
      <img className='cover' src={`${WEATHER_ICON_URL}/${iconWeather}@2x.png`} alt={iconAlt} />
    </td>
  );
};

//Компонент виведення значення вологості
export const RenderHumidityCell = (item: HourlyWeatherData): JSX.Element => {
  const { humidityPercent } = getWeatherHoursObject(item);

  return <td className={cellCommonStyles}>{humidityPercent}</td>;
};

//Компонент виведення значення атмосферного тиску
export const RenderPressureCell = (item: HourlyWeatherData): JSX.Element => {
  const { pressureMmHg } = getWeatherHoursObject(item);

  return <td className={cellCommonStyles}>{pressureMmHg}</td>;
};

//Компонент виведення значення сили вітра
export const RenderWindSpeedCell = (item: HourlyWeatherData): JSX.Element => {
  const { windSpeed } = getWeatherHoursObject(item);

  return <td className={cellCommonStyles}>{windSpeed}</td>;
};
