import React from 'react';
import {
  convertTimezone,
  receiveCurrentDate,
  convertUnixTimestampToHHMM,
  hPaToMmHg,
  formatKmToMetre,
  getWindStrengthScale,
} from 'helpers';
import { useWeatherCollector, useWindowWidth } from 'hooks';
import { SvgIcon } from 'ui';

const WeatherDetailsForToday = () => {
  const { currentWeather } = useWeatherCollector();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { days, dateNow } = receiveCurrentDate();

  return (
    <div className='w-full h-full backface-hidden col-[1/1] rows-[1/1] flex flex-col gap-3 justify-between'>
      <div className='text-center mb-3'>
        <p className='font-weather text-3.5xl md:text-4.5xl text-contrastWhite'>{days}</p>
        <p className='font-weather text-2.5xl md:text-3.5xl text-contrastWhite'>{dateNow}</p>
      </div>
      <div className='grid grid-cols-2 grid-rows-2 gap-y-3.5'>
        <p className='text-contrastWhite text-base md:text-medium flex gap-3 items-center'>
          <SvgIcon
            svgName='icon-earth'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 16 : 24}
            className='fill-whiteBase'
          />
          {convertTimezone(currentWeather?.timezone)} UTC
        </p>
        <p className='text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end'>
          {currentWeather?.main?.humidity} &#37;
          <SvgIcon
            svgName='icon-humidity'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 18 : 30}
            className='fill-whiteBase'
          />
        </p>
        <p className='text-contrastWhite text-base md:text-medium flex gap-3 items-center'>
          <SvgIcon
            svgName='icon-pressure'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 18 : 30}
            className='fill-whiteBase'
          />
          {hPaToMmHg(currentWeather?.main?.pressure)} mm.Hg
        </p>
        <p className='text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end'>
          {currentWeather?.main?.pressure} &#13169;
          <SvgIcon
            svgName='icon-pressure'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 18 : 30}
            className='fill-whiteBase'
          />
        </p>
        <p className='text-contrastWhite text-base md:text-medium flex gap-3 items-center'>
          <SvgIcon
            svgName='icon-sunrise'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 30}
            className='fill-whiteBase'
          />
          {convertUnixTimestampToHHMM(currentWeather?.sys?.sunrise)} AM
        </p>
        <p className='text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end'>
          {convertUnixTimestampToHHMM(currentWeather?.sys?.sunset)} PM
          <SvgIcon
            svgName='icon-sunset'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 30}
            className='fill-whiteBase'
          />
        </p>
        <p className='text-contrastWhite text-base md:text-medium flex gap-3 items-center'>
          <SvgIcon
            svgName='icon-eye-opened'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 30}
            className='fill-whiteBase'
          />
          {formatKmToMetre(currentWeather?.visibility)} km
        </p>
        <div className='flex gap-3 items-center justify-end'>
          <p className='text-contrastWhite flex flex-col text-base lg:text-medium'>
            {currentWeather?.wind?.speed} m/s{' '}
            <span className='text-[8px]'>
              ({getWindStrengthScale(currentWeather?.wind?.speed)} on the Beaufort scale)
            </span>
          </p>
          <SvgIcon
            svgName='icon-weather-wind'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 30}
            className='fill-whiteBase'
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailsForToday;
