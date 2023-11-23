import React from 'react';

import { HourlyWeatherData } from 'types';

import { hPaToMmHg } from '../assistants';

export const RenderTemperatureCell = (item: HourlyWeatherData) => {
  return (
    <td className='py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center'>
      {Math.ceil(item?.main?.temp)}°C
    </td>
  );
};

export const RenderWeatherIConCell = (item: HourlyWeatherData) => {
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

export const RenderHumidityCell = (item: HourlyWeatherData) => {
  return (
    <td className='py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center'>
      {item?.main?.humidity}
    </td>
  );
};

export const RenderPressureCell = (item: HourlyWeatherData) => {
  return (
    <td className='py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center'>
      {hPaToMmHg(item?.main?.pressure)}
    </td>
  );
};

export const RenderWindSpeedCell = (item: HourlyWeatherData) => {
  return (
    <td className='py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center'>
      {item?.wind?.speed}
    </td>
  );
};
