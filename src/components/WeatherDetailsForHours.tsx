import React from 'react';

import { HourlyWeatherData } from 'types';

import { convertUnixTimestampToHHMM, hPaToMmHg } from 'helpers';
import { useWeatherCollector, useWindowWidth } from 'hooks';

import { SvgIcon } from 'ui';

const WeatherDetailsForHours = () => {
  const { hourlyWeather } = useWeatherCollector();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  return (
    <div
      className={`w-full h-full backface-hidden flex bg-accentBase duration-500 ease-in rotate-y-180 col-[1/1] rows-[1/1]`}
    >
      <table className='bg-accentBase min-w-full h-full border border-separate border-transparent'>
        <thead className='h-10'>
          <tr>
            <th className='w-10 pr-2'>
              <SvgIcon
                svgName='icon-time'
                size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
                className='fill-whiteBase'
              />
            </th>
            {hourlyWeather &&
              Array.isArray(hourlyWeather) &&
              hourlyWeather?.map((item: HourlyWeatherData) => {
                const convertedTime = convertUnixTimestampToHHMM(item?.dt);
                return (
                  <th
                    key={item?.dt}
                    scope='col'
                    className='whitespace-nowrap text-small md:text-base text-whiteBase text-center -rotate-90'
                  >
                    {convertedTime}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row' className='w-10 pr-2'>
              <SvgIcon
                svgName='icon-thermometer'
                size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
                className='fill-whiteBase'
              />
            </th>
            {hourlyWeather &&
              Array.isArray(hourlyWeather) &&
              hourlyWeather?.map((item: HourlyWeatherData) => {
                return (
                  <td
                    key={item?.dt}
                    className='py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center'
                  >
                    {Math.ceil(item?.main?.temp)}°C
                  </td>
                );
              })}
          </tr>
          <tr>
            <th scope='row' className='w-10 pr-2'>
              <SvgIcon
                svgName='icon-sun'
                size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
                className='stroke-whiteBase fill-transparent'
              />
            </th>
            {hourlyWeather &&
              Array.isArray(hourlyWeather) &&
              hourlyWeather?.map((item: HourlyWeatherData) => {
                return (
                  <td key={item?.dt} className='h-[35px]'>
                    <img
                      className='cover'
                      src={`https://openweathermap.org/img/wn/${item?.weather?.[0]?.['icon']}@2x.png`}
                      alt={item?.weather?.[0]?.description}
                    />
                  </td>
                );
              })}
          </tr>
          <tr data-tooltip-target='tooltip-humidity' data-tooltip-placement='left'>
            <th scope='row' className='w-10 pr-2'>
              <SvgIcon
                svgName='icon-humidity'
                size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 28}
                className='fill-whiteBase'
              />
            </th>

            {hourlyWeather &&
              Array.isArray(hourlyWeather) &&
              hourlyWeather?.map((item: HourlyWeatherData) => {
                return (
                  <td
                    key={item?.dt}
                    className='py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center'
                  >
                    {item?.main?.humidity}
                  </td>
                );
              })}
          </tr>
          <div
            id='tooltip-humidity'
            role='tooltip'
            className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
          >
            Humidity, %<div className='tooltip-arrow' data-popper-arrow></div>
          </div>

          <tr data-tooltip-target='tooltip-pressure' data-tooltip-placement='left'>
            <th scope='row' className='w-10 pr-2'>
              <SvgIcon
                svgName='icon-pressure'
                size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
                className='fill-whiteBase'
              />
            </th>

            {hourlyWeather &&
              Array.isArray(hourlyWeather) &&
              hourlyWeather?.map((item: HourlyWeatherData) => {
                return (
                  <td
                    key={item?.dt}
                    className='py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center'
                  >
                    {hPaToMmHg(item?.main?.pressure)}
                  </td>
                );
              })}
          </tr>
          <div
            id='tooltip-pressure'
            role='tooltip'
            className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
          >
            Pressure, mm.Hg
            <div className='tooltip-arrow' data-popper-arrow></div>
          </div>

          <tr data-tooltip-target='tooltip-windSpeed' data-tooltip-placement='left'>
            <th scope='row' className='w-10 pr-2'>
              <SvgIcon
                svgName='icon-weather-wind'
                size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
                className='fill-whiteBase'
              />
            </th>
            {hourlyWeather &&
              Array.isArray(hourlyWeather) &&
              hourlyWeather?.map((item: HourlyWeatherData) => {
                return (
                  <td
                    key={item?.dt}
                    className='py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center'
                  >
                    {item?.wind?.speed}
                  </td>
                );
              })}
          </tr>
          <div
            id='tooltip-windSpeed'
            role='tooltip'
            className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
          >
            Wind speed, m/s
            <div className='tooltip-arrow' data-popper-arrow></div>
          </div>
        </tbody>
      </table>
    </div>
  );
};

export default WeatherDetailsForHours;
