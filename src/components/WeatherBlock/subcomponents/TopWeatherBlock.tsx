import React, { FC } from 'react';

import { useWindowWidth } from 'contexts';

import { SvgIcon } from 'ui';
import { WeatherData } from 'types';

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
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  return (
    <div
      className='flex justify-evenly gap-5 items-center mx-auto cursor-pointer'
      onClick={toggleTemperatureScale}
    >
      <div className='relative w-[83px] md:w-[96px] after:content-[""] after:h-full after:absolute after:w-px after:-right-2 after:top-0 after:bg-white text-center'>
        <p className='w-full font-weather text-monstrous md:text-[64px] text-contrastWhite'>
          {currentWeather?.main !== undefined &&
            (isCelsius
              ? Math.round(currentWeather?.main?.temp) + '\u00b0'
              : Math.round((currentWeather?.main?.temp * 9) / 5 + 32) + '\u00b0')}
        </p>
      </div>
      <div>
        {currentWeather?.weather && currentWeather?.weather[0]?.main && (
          <p className='font-weather text-3xl md:text-4.5xl text-contrastWhite'>
            {currentWeather?.weather[0]?.main}
          </p>
        )}
        <p className='font-weather text-base md:text-2xl text-contrastWhite mb-2.5'>
          Feels like{' '}
          {isCelsius
            ? currentWeather?.main?.feels_like &&
              Math.round(currentWeather?.main?.feels_like) + '\u00b0' + 'C'
            : currentWeather?.main?.feels_like &&
              Math.round((currentWeather?.main?.feels_like * 9) / 5 + 32) + '\u00b0' + 'F'}
        </p>
        <div className='flex items-center gap-1 md:gap-2 text-contrastWhite bg-weatherForeground py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] rounded-lg'>
          <SvgIcon
            svgName='icon-location'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 27}
            className='fill-whiteBase'
          />
          <p className='text-base md:text-2xl text-contrastWhite'>{currentWeather?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default TopWeatherBlock;
