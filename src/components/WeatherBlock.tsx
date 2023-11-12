import React from 'react';
import { PrimaryButton, SvgIcon } from 'ui';
import Loader from './Loader';
import WeatherDetailsForHours from './WeatherDetailsForHours';
import WeatherDetailsForToday from './WeatherDetailsForToday';
import { useWeather, useWeatherCollector } from 'hooks';

const WeatherBlock = () => {
  const {
    hasGeolocationPermission,
    isCelsius,
    flippingCard,
    requestGeolocationPermission,
    toggleTemperatureScale,
    flipWeatherDetails,
  } = useWeather();

  const { isWeatherLoading, currentWeather } = useWeatherCollector();

  const emptyWeather = currentWeather && Object.keys(currentWeather).length === 0;

  return (
    <>
      {!isWeatherLoading ? (
        <div className='flex flex-col items-center justify-between bg-accentBase w-full hg:w-[442px] h-full py-10 px-14 md:px-10 text-center'>
          <h2 className='text-whiteBase text-medium md:text-2xl lg:text-4xl'>
            What a pity, this could be your weather
          </h2>
          <span className='mt-20 mb-28'>
            <SvgIcon svgName='icon-moon' size={156} className='fill-transparent stroke-greyBase' />
          </span>
          <PrimaryButton
            id='Geolocation permission button'
            variant='Primary'
            onHandleClick={requestGeolocationPermission}
            classNameButton='border border-solid border-whiteBase'
          >
            Give permission for your geolocation
          </PrimaryButton>
        </div>
      ) : isWeatherLoading && emptyWeather ? (
        <Loader variant='element' />
      ) : (
        currentWeather &&
        hasGeolocationPermission && (
          <>
            <div className='bg-accentBase w-full h-full hg:w-[442px] py-8 px-3.5 md:pt-10 md:px-8 lg:px-[53px]'>
              <div
                className='flex gap-6 items-center mx-auto cursor-pointer'
                onClick={toggleTemperatureScale}
              >
                <p className='relative font-weather text-monstrous md:text-[64px] text-contrastWhite after:content-[""] after:h-full after:absolute after:w-px after:-right-2 after:top-0 after:bg-white'>
                  {isCelsius
                    ? Math.round(currentWeather?.main?.temp) + '\u00b0'
                    : Math.round((currentWeather?.main?.temp * 9) / 5 + 32) + '\u00b0'}
                </p>
                <div>
                  {currentWeather?.weather && currentWeather?.weather[0]?.main && (
                    <p className='font-weather text-3xl md:text-4.5xl text-contrastWhite'>
                      {currentWeather?.weather[0]?.main}
                    </p>
                  )}
                  <p className='font-weather text-base md:text-2xl text-contrastWhite'>
                    Feels like{' '}
                    {isCelsius
                      ? Math.round(currentWeather?.main?.feels_like) + '\u00b0' + 'C'
                      : Math.round((currentWeather?.main?.feels_like * 9) / 5 + 32) +
                        '\u00b0' +
                        'F'}
                  </p>
                  <div className='flex items-center gap-1 md:gap-2 text-contrastWhite bg-weatherForeground py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] rounded-lg'>
                    <SvgIcon svgName='icon-location' size={27} className='fill-whiteBase' />
                    <p className='text-base md:text-2xl text-contrastWhite'>
                      {currentWeather?.name}
                    </p>
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
              <div
                className='w-full h-56 perspective-10 cursor-pointer'
                onClick={flipWeatherDetails}
              >
                <div
                  className={`w-full h-full transition-transform grid grid-cols-1 grid-rows-1 transform-style-3d ${flippingCard}`}
                >
                  <WeatherDetailsForToday />
                  <WeatherDetailsForHours />
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default WeatherBlock;
