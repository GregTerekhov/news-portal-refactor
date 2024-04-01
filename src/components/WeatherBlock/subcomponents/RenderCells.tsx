import React from 'react';

import type { HourlyWeatherData } from 'types';

import { convertTemperature, hPaToMmHg } from '../assistants';

const cellCommonStyles =
  'py-1.5 text-center text-small text-whiteBase md:py-4 md:text-base hg:text-medium';

//Компонент виведення значення температур
export const RenderTemperatureCell = (item: HourlyWeatherData, isCelsius: boolean): JSX.Element => {
  return (
    <td className={`${cellCommonStyles}`}>
      {isCelsius
        ? convertTemperature(item?.main?.temp, true) + 'C'
        : convertTemperature(item?.main?.temp, false) + 'F'}
    </td>
  );
};

//Компонент виведення відповідних іконок погоди
export const RenderWeatherIconCell = (item: HourlyWeatherData): JSX.Element => {
  return (
    <td className='h-35px'>
      <img
        className='cover'
        src={`https://openweathermap.org/img/wn/${item?.weather?.[0]?.['icon']}@2x.png`}
        alt={item?.weather?.[0]?.description}
      />
    </td>
  );
};

//Компонент виведення значення вологості
export const RenderHumidityCell = (item: HourlyWeatherData): JSX.Element => {
  return <td className={`${cellCommonStyles}`}>{item?.main?.humidity}</td>;
};

//Компонент виведення значення атмосферного тиску
export const RenderPressureCell = (item: HourlyWeatherData): JSX.Element => {
  return <td className={`${cellCommonStyles}`}>{hPaToMmHg(item?.main?.pressure)}</td>;
};

//Компонент виведення значення сили вітра
export const RenderWindSpeedCell = (item: HourlyWeatherData): JSX.Element => {
  return <td className={`${cellCommonStyles}`}>{item?.wind?.speed}</td>;
};
