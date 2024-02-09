import React, { FC } from 'react';

import { ICON_SIZES } from 'constants/iconSizes';
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
      className='mx-auto flex cursor-pointer items-center justify-evenly gap-5'
      onClick={toggleTemperatureScale}
    >
      <div className='w-83px md:w-96px relative text-center after:absolute after:-right-2 after:top-0 after:h-full after:w-px after:bg-white after:content-[""]'>
        <p className='w-full font-weather text-monstrous text-contrastWhite md:text-[64px]'>
          {currentWeather?.main !== undefined &&
            (isCelsius
              ? Math.round(currentWeather?.main?.temp) + '\u00b0'
              : Math.round((currentWeather?.main?.temp * 9) / 5 + 32) + '\u00b0')}
        </p>
      </div>
      <div>
        {currentWeather?.weather && currentWeather?.weather[0]?.main && (
          <p className='font-weather text-3xl text-contrastWhite md:text-4.5xl'>
            {currentWeather?.weather[0]?.main}
          </p>
        )}
        <p className='mb-2.5 font-weather text-base text-contrastWhite md:text-2xl'>
          Feels like{' '}
          {isCelsius
            ? currentWeather?.main?.feels_like &&
              Math.round(currentWeather?.main?.feels_like) + '\u00b0' + 'C'
            : currentWeather?.main?.feels_like &&
              Math.round((currentWeather?.main?.feels_like * 9) / 5 + 32) + '\u00b0' + 'F'}
        </p>
        <div className='flex items-center gap-1 rounded-lg bg-weatherForeground px-2 py-[9px] text-contrastWhite md:gap-2 md:pb-[9px] md:pl-[7px] md:pr-[17px] md:pt-[10px]'>
          <SvgIcon
            svgName='icon-location'
            size={
              breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile
                ? ICON_SIZES.smIcon20
                : ICON_SIZES.mdIcon27
            }
            className='fill-whiteBase'
          />
          <p className='text-base text-contrastWhite md:text-2xl'>{currentWeather?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default TopWeatherBlock;
