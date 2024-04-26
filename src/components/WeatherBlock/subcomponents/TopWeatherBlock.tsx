import React, { FC } from 'react';

import type { WeatherData } from 'types';
import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from 'ui';

import { getWeatherTodayObject } from '../assistants';

interface TopWeatherProps {
  toggleTemperatureScale: () => void;
  isCelsius: boolean;
  currentWeather: WeatherData;
}

const TopWeatherBlock: FC<TopWeatherProps> = ({
  toggleTemperatureScale,
  currentWeather,
  isCelsius,
}) => {
  const { isMobile } = useWindowWidthContext();

  const { currentTemperature, prevailingWeather, feelsLike, location } = getWeatherTodayObject(
    currentWeather,
    isCelsius,
  );

  return (
    <div
      className='mx-auto flex cursor-pointer items-center justify-evenly gap-5'
      onClick={toggleTemperatureScale}
    >
      <div className='relative w-83px text-center after:absolute after:-right-2 after:top-0 after:h-full after:w-px after:bg-white after:content-[""] md:w-96px'>
        <p className='font-weather text-monstrous text-contrastWhite  md:text-[64px]'>
          {currentTemperature}
        </p>
      </div>
      <div className='space-y-2.5'>
        <div>
          <p className='font-weather text-3xl text-contrastWhite md:text-4.5xl'>
            {prevailingWeather}
          </p>
          <p className='font-weather text-base text-contrastWhite md:text-2xl'>
            Feels like {feelsLike}
          </p>
        </div>
        <div className='flex items-center gap-1 rounded-lg bg-weatherForeground px-2 py-[9px] text-contrastWhite md:gap-2 md:pb-[9px] md:pl-[7px] md:pr-[17px] md:pt-[10px]'>
          <SvgIcon
            svgName='location'
            sizeKey={isMobile ? 'smIcon20' : 'mdIcon27'}
            className='fill-whiteBase'
          />
          <p className='font-weather text-base text-contrastWhite md:text-medium'>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default TopWeatherBlock;
