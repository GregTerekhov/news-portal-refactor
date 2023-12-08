import React, { FC, ReactNode } from 'react';

import {
  gridWeatherClass,
  gridWeatherItemClass,
  weatherCurrentDateTextClass,
  weatherCurrentLocationClass,
  weatherCurrentTemperatureClass,
  weatherDayTextClass,
  weatherDetailsBlockClass,
  weatherFeelsLikeClass,
  weatherIconClass,
  weatherInfoWrapperClass,
  weatherWrapperClass,
  currentWeatherInfoClass,
} from '../assistants';

const SkeletonWeather: FC = () => {
  const gridItems: ReactNode[] = Array(8)
    .fill(null)
    .map((_, index) => <div key={index} className={gridWeatherItemClass}></div>);

  return (
    <div className={`${weatherWrapperClass}`}>
      <div className='flex gap-x-4 lg:gap-x-6'>
        <div className={`${weatherCurrentTemperatureClass}`}></div>
        <div className={`${weatherInfoWrapperClass}`}>
          <div className={`${currentWeatherInfoClass}`}></div>
          <div className={`${weatherFeelsLikeClass}`}></div>
          <div className={`${weatherCurrentLocationClass}`}></div>
        </div>
      </div>
      <div className={`${weatherIconClass}`}></div>
      <div className={`${weatherDetailsBlockClass}`}>
        <div className={`${weatherDayTextClass}`}></div>
        <div className={`${weatherCurrentDateTextClass}`}></div>
        <div className='lg:w-full lg:px-6'>
          <div className={`${gridWeatherClass}`}>{gridItems}</div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonWeather;
