import React, { useEffect, useState } from 'react';
import { SvgIcon } from 'ui';
import { fetchWeather, selectLoading, selectPosition } from 'redux/weather';
import { receiveCurrentDate, convertTimezone } from 'helpers';
import { useWindowWidth } from 'hooks';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import Loader from './Loader';

const WeatherBlock = () => {
  const { days, dateNow } = receiveCurrentDate();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [hasGeolocationPermission, setHasGeolocationPermission] = useState<boolean>(false);

  const getWeatherData = useAppSelector(selectPosition);
  const isLoading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const geolocation: boolean = 'geolocation' in navigator;

  useEffect(() => {
    if (geolocation) {
      // const hasVisitedBefore = document.cookie
      //   .split(';')
      //   .some((cookie) => cookie.trim().startsWith('visited='));
      // if (hasVisitedBefore) { }
      // else {

      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          setHasGeolocationPermission(true);
          navigator.geolocation.getCurrentPosition((position) => {
            // const latitude = position.coords.latitude,
            //   const longitude = position.coords.longitude,
            const sendGeoLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            dispatch(fetchWeather(sendGeoLocation));
          });
        }
      });
    }
  }, []);

  const toggleTemperatureScale = () => {
    setIsCelsius(!isCelsius);
  };

  const emptyWeather = getWeatherData && Object.keys(getWeatherData).length === 0;
  return (
    <>
      {!isLoading && !hasGeolocationPermission ? (
        <div className='flex flex-col items-center bg-accentBase w-72 hg:w-[442px] sm:h-[469px] md:h-[675px] w-fit py-10 px-14 text-center'>
          <h2 className='text-darkBase dark:text-whiteBase text-medium md:text-2xl lg:text-4xl'>
            What a pity, this could be your weather
          </h2>
          <span className='mt-20 mb-28'>
            <SvgIcon svgName='icon-moon' size={156} className='fill-transparent stroke-greyBase' />
          </span>
        </div>
      ) : isLoading && !hasGeolocationPermission && emptyWeather ? (
        <Loader />
      ) : (
        <div className='flex flex-col justify-between bg-accentBase w-72 hg:w-[442px] py-8 px-9 md:pt-10 md:pb-[60px] md:px-8 lg:px-[53px] sm:h-[469px] md:h-[675px] w-fit'>
          <div className='flex gap-6 items-center cursor-pointer' onClick={toggleTemperatureScale}>
            <p className='relative font-weather text-monstrous md:text-[64px] text-contrastWhite after:content-[""] after:h-full after:absolute after:w-px after:-right-2 after:top-0 after:bg-white'>
              {isCelsius
                ? Math.round(getWeatherData?.main?.temp) + '\u00b0'
                : Math.round((getWeatherData?.main?.temp * 9) / 5 + 32) + '\u00b0'}
            </p>
            <div>
              {getWeatherData?.weather && getWeatherData?.weather[0]?.main && (
                <p className='font-weather text-3xl md:text-4.5xl text-contrastWhite'>
                  {getWeatherData?.weather[0]?.main}
                </p>
              )}
              <p className='font-weather text-base md:text-2xl text-contrastWhite'>
                Feels like{' '}
                {isCelsius
                  ? Math.round(getWeatherData?.main?.feels_like) + '\u00b0' + 'C'
                  : Math.round((getWeatherData?.main?.feels_like * 9) / 5 + 32) + '\u00b0' + 'F'}
              </p>
              <div className='flex items-center gap-1 md:gap-2 text-contrastWhite bg-weatherLocation py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] rounded-lg'>
                <SvgIcon svgName='icon-location' size={27} className='fill-whiteBase' />
                <p className='text-base md:text-2xl text-contrastWhite'>{getWeatherData?.name}</p>
              </div>
            </div>
          </div>
          {getWeatherData?.weather && getWeatherData?.weather[0]['icon'] && (
            <img
              className='m-auto w-32 h-32 md:w-[165px] md:h-[165px]'
              src={`https://openweathermap.org/img/wn/${getWeatherData?.weather[0]['icon']}@2x.png`}
              alt={getWeatherData?.weather?.[0]?.description}
            />
          )}
          <div>
            <div className='text-center mb-3'>
              <p className='font-weather text-3.5xl md:text-4.5xl text-contrastWhite'>{days}</p>
              <p className='font-weather text-2.5xl md:text-3.5xl text-contrastWhite'>{dateNow}</p>
            </div>
            <div className='grid grid-cols-2 grid-rows-2 gap-y-1.5'>
              <p className='text-contrastWhite text-base md:text-medium flex gap-3 items-center'>
                <SvgIcon
                  svgName='icon-earth'
                  size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 16 : 24}
                  className='fill-whiteBase'
                />
                {convertTimezone(getWeatherData?.timezone)} UTC
              </p>

              <p className='text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end'>
                {getWeatherData?.main?.pressure} PSI
                <SvgIcon
                  svgName='icon-pressure'
                  size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 18 : 30}
                  className='fill-whiteBase'
                />
              </p>
              <p className='text-contrastWhite text-base md:text-medium flex gap-3 items-center'>
                <SvgIcon
                  svgName='icon-humidity'
                  size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 18 : 30}
                  className='fill-whiteBase'
                />
                {getWeatherData?.main?.humidity} &#37;
              </p>
              <p className='text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end'>
                {getWeatherData?.wind?.speed} m/s
                <SvgIcon
                  svgName='icon-weather-wind'
                  size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 24 : 30}
                  className='fill-whiteBase'
                />
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherBlock;
