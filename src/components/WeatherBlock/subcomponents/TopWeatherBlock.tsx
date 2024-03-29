import React, { FC } from 'react';

import type { WeatherData } from 'types';
import { useWindowWidth } from 'contexts';

import { SvgIcon } from 'ui';

import { convertTemperature } from '../assistants';

interface TopWeatherProps {
  toggleTemperatureScale: () => void;
  isCelsius: boolean;
  currentWeather: Partial<WeatherData>;
}

const TopWeatherBlock: FC<TopWeatherProps> = ({
  toggleTemperatureScale,
  currentWeather,
  isCelsius,
}) => {
  const { isMobile } = useWindowWidth();

  const currentTemperature = currentWeather.main?.temp ?? 0;
  const feelsLike = currentWeather.main?.feels_like ?? 0;
  const prevailingWeather = currentWeather.weather?.[0]?.main ?? '';
  const cityArea = currentWeather.name ?? '';

  return (
    <div
      className='mx-auto flex cursor-pointer items-center justify-evenly gap-5'
      onClick={toggleTemperatureScale}
    >
      <div className='relative w-83px text-center after:absolute after:-right-2 after:top-0 after:h-full after:w-px after:bg-white after:content-[""] md:w-96px'>
        <p className='font-weather text-monstrous text-contrastWhite  md:text-[64px]'>
          {convertTemperature(currentTemperature, isCelsius)}
        </p>
      </div>
      <div className='space-y-2.5'>
        <div>
          <p className='font-weather text-3xl text-contrastWhite md:text-4.5xl'>
            {prevailingWeather}
          </p>
          <p className='font-weather text-base text-contrastWhite md:text-2xl'>
            Feels like{' '}
            {isCelsius
              ? convertTemperature(feelsLike, true) + 'C'
              : convertTemperature(feelsLike, false) + 'F'}
          </p>
        </div>
        <div className='flex items-center gap-1 rounded-lg bg-weatherForeground px-2 py-[9px] text-contrastWhite md:gap-2 md:pb-[9px] md:pl-[7px] md:pr-[17px] md:pt-[10px]'>
          <SvgIcon
            svgName='location'
            sizeKey={isMobile ? 'smIcon20' : 'mdIcon27'}
            className='fill-whiteBase'
          />
          <p className='font-weather text-base text-contrastWhite md:text-medium'>{cityArea}</p>
        </div>
      </div>
    </div>
  );
};

export default TopWeatherBlock;
