import React, { FC } from 'react';

import { CONFIG } from 'config';
import { useWeatherAPIRedux } from 'reduxStore/hooks';

import { useWeather } from './hooks';

import { Loader } from 'ui';
import {
  NoWeather,
  TopWeatherBlock,
  WeatherDetailsForHours,
  WeatherDetailsForToday,
} from './subcomponents';

import { getWeatherTodayObject } from './assistants';

const WeatherBlock: FC<{}> = () => {
  const {
    hasGeolocationPermission,
    isCelsius,
    flippingCard,
    toggleTemperatureScale,
    flipWeatherDetails,
  } = useWeather();

  const { isWeatherLoading, currentWeather, weatherError } = useWeatherAPIRedux();

  const emptyWeather = currentWeather && Object.keys(currentWeather).length === 0;
  const showError = weatherError && weatherError;

  const showNoWeather = (!isWeatherLoading && emptyWeather) || showError;
  const showLoader = isWeatherLoading && hasGeolocationPermission;
  const showWeather = !isWeatherLoading && !emptyWeather && hasGeolocationPermission;

  const { iconWeather, iconAlt } = getWeatherTodayObject(currentWeather);

  const getContainerStyles = () => {
    switch (true) {
      case !isWeatherLoading && emptyWeather && !showError:
        return 'flex flex-col items-center justify-between px-6 py-10 text-center md:px-10';
      case !!showError:
        return 'px-6 py-10 text-center md:px-10';

      default:
        return 'px-5 py-8 md:px-8 md:pt-10 hg:pt-8';
    }
  };

  const weatherContainerStyles = `${getContainerStyles()} h-[515px] md:h-700px flex flex-col justify-between w-full bg-accentBase hg:w-442px`;

  return (
    <div className={`${weatherContainerStyles}`}>
      {showNoWeather && <NoWeather showError={showError} />}
      {showLoader && <Loader variant='element' />}
      {showWeather && (
        <>
          <TopWeatherBlock
            toggleTemperatureScale={toggleTemperatureScale}
            currentWeather={currentWeather}
            isCelsius={isCelsius}
          />
          {iconWeather && (
            <img
              className='m-auto h-32 w-32 md:h-165px md:w-165px hg:h-180px hg:w-180px'
              src={`${CONFIG.WEATHER_ICON_URL}/${iconWeather}@2x.png`}
              alt={iconAlt}
            />
          )}
          <div
            className='h-56 w-full cursor-pointer perspective-10 md:h-[314px]'
            onClick={flipWeatherDetails}
          >
            <div
              className={`grid h-full w-full grid-cols-1 grid-rows-1 transition-transform transform-style-3d ${flippingCard}`}
            >
              <WeatherDetailsForToday />
              <WeatherDetailsForHours isCelsius={isCelsius} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherBlock;
