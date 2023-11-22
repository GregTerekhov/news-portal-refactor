import React, { FC } from 'react';

import { useWindowWidth } from 'hooks';

import { SvgIcon } from 'ui';

import {
  convertUnixTimestampToHHMM,
  hPaToMmHg,
  formatKmToMetre,
  convertTimezone,
  getWindStrengthScale,
  receiveCurrentDate,
} from '../assistants';

import { useWeatherCollector } from '../hooks';

const WeatherDetailsForToday: FC<{}> = () => {
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
        <p
          className='text-contrastWhite text-base md:text-medium flex gap-3 items-center'
          data-tooltip-target='tooltip-timezone'
          data-tooltip-placement='right'
        >
          <SvgIcon
            svgName='icon-earth'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 16 : 24}
            className='fill-whiteBase'
          />
          {convertTimezone(currentWeather?.timezone)} UTC
        </p>
        <div
          id='tooltip-timezone'
          role='tooltip'
          className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
        >
          Timezone
          <div className='tooltip-arrow' data-popper-arrow></div>
        </div>

        <p
          className='text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end'
          data-tooltip-target='tooltip-humidity'
          data-tooltip-placement='left'
        >
          {currentWeather?.main?.humidity} &#37;
          <SvgIcon
            svgName='icon-humidity'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 18 : 30}
            className='fill-whiteBase'
          />
        </p>
        <div
          id='tooltip-humidity'
          role='tooltip'
          className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
        >
          Humidity
          <div className='tooltip-arrow' data-popper-arrow></div>
        </div>

        <p
          className='text-contrastWhite text-base md:text-medium flex gap-3 items-center'
          data-tooltip-target='tooltip-pressure-mmHg'
          data-tooltip-placement='right'
        >
          <SvgIcon
            svgName='icon-pressure'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 18 : 30}
            className='fill-whiteBase'
          />
          {hPaToMmHg(currentWeather?.main?.pressure)} mm.Hg
        </p>
        <div
          id='tooltip-pressure-mmHg'
          role='tooltip'
          className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
        >
          Pressure
          <div className='tooltip-arrow' data-popper-arrow></div>
        </div>

        <p
          className='text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end'
          data-tooltip-target='tooltip-pressure-hpa'
          data-tooltip-placement='left'
        >
          {currentWeather?.main?.pressure} &#13169;
          <SvgIcon
            svgName='icon-pressure'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 18 : 30}
            className='fill-whiteBase'
          />
        </p>
        <div
          id='tooltip-pressure-hpa'
          role='tooltip'
          className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
        >
          Pressure
          <div className='tooltip-arrow' data-popper-arrow></div>
        </div>

        <p
          className='text-contrastWhite text-base md:text-medium flex gap-3 items-center'
          data-tooltip-target='tooltip-sunrise'
          data-tooltip-placement='right'
        >
          <SvgIcon
            svgName='icon-sunrise'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 30}
            className='fill-whiteBase'
          />
          {convertUnixTimestampToHHMM(currentWeather?.sys?.sunrise)} AM
        </p>
        <div
          id='tooltip-sunrise'
          role='tooltip'
          className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
        >
          Sunrise
          <div className='tooltip-arrow' data-popper-arrow></div>
        </div>

        <p
          className='text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end'
          data-tooltip-target='tooltip-sunset'
          data-tooltip-placement='left'
        >
          {convertUnixTimestampToHHMM(currentWeather?.sys?.sunset)} PM
          <SvgIcon
            svgName='icon-sunset'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 30}
            className='fill-whiteBase'
          />
        </p>
        <div
          id='tooltip-sunset'
          role='tooltip'
          className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
        >
          Sunset
          <div className='tooltip-arrow' data-popper-arrow></div>
        </div>

        <p
          className='text-contrastWhite text-base md:text-medium flex gap-3 items-center'
          data-tooltip-target='tooltip-visibility'
          data-tooltip-placement='right'
        >
          <SvgIcon
            svgName='icon-eye-opened'
            size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 30}
            className='fill-whiteBase'
          />
          {formatKmToMetre(currentWeather?.visibility)} km
        </p>
        <div
          id='tooltip-visibility'
          role='tooltip'
          className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
        >
          Visibility
          <div className='tooltip-arrow' data-popper-arrow></div>
        </div>

        <div className='flex gap-3 items-center justify-end'>
          <p
            className='text-contrastWhite flex flex-col text-base lg:text-medium text-end'
            data-tooltip-target='tooltip-windSpeed'
            data-tooltip-placement='left'
          >
            {currentWeather?.wind?.speed} m/s{' '}
            <span className='text-[8px]'>
              ({getWindStrengthScale(currentWeather?.wind?.speed)} on the Beaufort scale)
            </span>
          </p>
          <div
            id='tooltip-windSpeed'
            role='tooltip'
            className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
          >
            Wind speed
            <div className='tooltip-arrow' data-popper-arrow></div>
          </div>

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
