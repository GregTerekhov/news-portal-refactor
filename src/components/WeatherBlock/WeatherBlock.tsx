import React, { FC } from 'react';

import { Loader } from 'ui';

import { useWeather, useWeatherCollector } from './hooks';
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
            <TopWeatherBlock
              toggleTemperatureScale={toggleTemperatureScale}
              currentWeather={currentWeather}
              isCelsius={isCelsius}
            />
            {currentWeather?.weather && currentWeather?.weather[0]['icon'] && (
              <img
                className='m-auto w-32 h-32 md:w-[165px] md:h-[165px] hg:w-[180px] hg:h-[180px]'
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
