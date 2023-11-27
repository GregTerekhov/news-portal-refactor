import React, { FC } from 'react';

import { useWindowWidth } from 'hooks';

import { Loader } from 'components';
import { SvgIcon } from 'ui';

import { useWeather, useWeatherCollector } from './hooks';
import { NoWeather, WeatherDetailsForHours, WeatherDetailsForToday } from './subcomponents';

const WeatherBlock: FC<{}> = () => {
  const {
    hasGeolocationPermission,
    isCelsius,
    flippingCard,
    toggleTemperatureScale,
    flipWeatherDetails,
  } = useWeather();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const { isWeatherLoading, currentWeather } = useWeatherCollector();
  // const isWeatherLoading = true;
  const emptyWeather = currentWeather && Object.keys(currentWeather).length === 0;
  const showLoader = isWeatherLoading && hasGeolocationPermission;
  // lg:px-[53px] забрано звідси 'py-8 px-5 md:pt-10 md:px-8'

  return (
    <div
      className={`${
        !isWeatherLoading && emptyWeather
          ? 'flex flex-col items-center justify-between text-center py-10 px-6 md:px-10'
          : 'py-8 px-5 md:pt-10 md:px-8'
      }  bg-accentBase w-full hg:w-[442px] h-full`}
    >
      {!isWeatherLoading && emptyWeather ? (
        <NoWeather />
      ) : showLoader ? (
        <Loader variant='element' />
      ) : (
        !isWeatherLoading &&
        !emptyWeather &&
        hasGeolocationPermission && (
          <>
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
                    ? Math.round(currentWeather?.main?.feels_like) + '\u00b0' + 'C'
                    : Math.round((currentWeather?.main?.feels_like * 9) / 5 + 32) + '\u00b0' + 'F'}
                </p>
                <div className='flex items-center gap-1 md:gap-2 text-contrastWhite bg-weatherForeground py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] rounded-lg'>
                  <SvgIcon
                    svgName='icon-location'
                    size={
                      breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 27
                    }
                    className='fill-whiteBase'
                  />
                  <p className='text-base md:text-2xl text-contrastWhite'>{currentWeather?.name}</p>
                </div>
              </div>
            </div>
            {currentWeather?.weather && currentWeather?.weather[0]['icon'] && (
              <img
                className='m-auto w-32 h-32 md:w-[165px] md:h-[165px]'
                src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0]['icon']}@2x.png`}
                alt={currentWeather?.weather?.[0]?.description}
              />
            )}
            <div className='w-full h-56 perspective-10 cursor-pointer' onClick={flipWeatherDetails}>
              <div
                className={`w-full h-full transition-transform grid grid-cols-1 grid-rows-1 transform-style-3d ${flippingCard}`}
              >
                <WeatherDetailsForToday />
                <WeatherDetailsForHours />
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default WeatherBlock;
