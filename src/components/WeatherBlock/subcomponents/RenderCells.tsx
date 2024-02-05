import React from 'react';

import { HourlyWeatherData } from 'types';

import { hPaToMmHg } from '../assistants';

export const RenderTemperatureCell = (item: HourlyWeatherData): JSX.Element => {
  return (
    <td className='py-1.5 text-center text-small text-whiteBase md:py-4 md:text-base'>
      {Math.ceil(item?.main?.temp)}°C
    </td>
  );
};

export const RenderWeatherIConCell = (item: HourlyWeatherData): JSX.Element => {
  return (
    <td className='h-[35px]'>
      <img
        className='cover'
        src={`https://openweathermap.org/img/wn/${item?.weather?.[0]?.['icon']}@2x.png`}
        alt={item?.weather?.[0]?.description}
      />
    </td>
  );
};

export const RenderHumidityCell = (item: HourlyWeatherData): JSX.Element => {
  return (
    <td className='py-1.5 text-center text-small text-whiteBase md:py-4 md:text-base'>
      {item?.main?.humidity}
    </td>
  );
};

export const RenderPressureCell = (item: HourlyWeatherData): JSX.Element => {
  return (
    <td className='py-1.5 text-center text-small text-whiteBase md:py-4 md:text-base'>
      {hPaToMmHg(item?.main?.pressure)}
    </td>
  );
};

export const RenderWindSpeedCell = (item: HourlyWeatherData): JSX.Element => {
  return (
    <td className='py-1.5 text-center text-small text-whiteBase md:py-4 md:text-base'>
      {item?.wind?.speed}
    </td>
  );
};
