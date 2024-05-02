import React, { FC } from 'react';

import SkeletonItem from './SkeletonItem';

import { weatherStyles } from '../assistants';

const SkeletonWeather: FC = () => {
  const {
    wrapper,
    currentDateText,
    currentLocation,
    currentTemperature,
    currentWeatherInfo,
    icon,
    infoWrapper,
    feelsLike,
    dayText,
    detailsBlock,
    grid,
    gridItem,
  } = weatherStyles;

  return (
    <div className={wrapper}>
      <div className='flex gap-x-4 lg:gap-x-6'>
        <div className={currentTemperature}></div>
        <div className={infoWrapper}>
          <div className={currentWeatherInfo}></div>
          <div className={feelsLike}></div>
          <div className={currentLocation}></div>
        </div>
      </div>
      <div className={icon}></div>
      <div className={detailsBlock}>
        <div className={dayText}></div>
        <div className={currentDateText}></div>
        <div className='lg:w-full lg:px-6'>
          <SkeletonItem count={8} className={grid} itemClassName={gridItem} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonWeather;
