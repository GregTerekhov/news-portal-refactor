import React, { FC } from 'react';

import { useWeatherAPI } from 'reduxStore/hooks';

import { useWeather } from './hooks';

import { Loader } from 'ui';

import {
  NoWeather,
  TopWeatherBlock,
  WeatherDetailsForHours,
  WeatherDetailsForToday,
} from './subcomponents';

const WeatherBlock: FC<{}> = () => {
  const {
    hasGeolocationPermission,
    isCelsius,
    flippingCard,
    toggleTemperatureScale,
    flipWeatherDetails,
  } = useWeather();

  const { isWeatherLoading, currentWeather, weatherError } = useWeatherAPI();

  const emptyWeather = currentWeather && Object.keys(currentWeather).length === 0;
  const showLoader = isWeatherLoading && hasGeolocationPermission;
  const showError = weatherError && weatherError?.cod?.includes('5');

  return (
    <div
      className={`${
        !isWeatherLoading && emptyWeather && !showError
          ? 'flex flex-col items-center justify-between px-6 py-10 text-center md:px-10'
          : showError
            ? 'px-6 py-10 text-center md:px-10'
            : 'px-5 py-8 md:px-8 md:pt-10'
      }  hg:w-442px h-full w-full bg-accentBase`}
    >
      {(!isWeatherLoading && emptyWeather) || showError ? (
        <NoWeather showError={showError} />
      ) : showLoader ? (
        <Loader variant='element' />
      ) : (
        !isWeatherLoading &&
        !emptyWeather &&
        hasGeolocationPermission && (
          <>
            <TopWeatherBlock
              toggleTemperatureScale={toggleTemperatureScale}
              currentWeather={currentWeather}
              isCelsius={isCelsius}
            />
            {currentWeather?.weather && currentWeather?.weather[0]['icon'] && (
              <img
                className='md:w-165px hg:w-180px md:h-165px hg:h-180px m-auto h-32 w-32'
                src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0]['icon']}@2x.png`}
                alt={currentWeather?.weather?.[0]?.description}
              />
            )}
            <div className='h-56 w-full cursor-pointer perspective-10' onClick={flipWeatherDetails}>
              <div
                className={`grid h-full w-full grid-cols-1 grid-rows-1 transition-transform transform-style-3d ${flippingCard}`}
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
