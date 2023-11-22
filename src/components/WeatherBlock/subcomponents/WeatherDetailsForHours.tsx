import React, { FC, useState } from 'react';

import { HourlyWeatherData } from 'types';

import { useWindowWidth } from 'hooks';

import { SvgIcon } from 'ui';

import { convertUnixTimestampToHHMM, hPaToMmHg } from '../assistants';
import { useWeatherCollector } from '../hooks';

const WeatherDetailsForHours: FC<{}> = () => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
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
          <tr
            className={`relative ${
              showTooltip
                ? 'hover:after:content-["Temperature_in_°C"] hover:after:absolute hover:after:block hover:after:-bottom-2 hover:after:left-2/4 hover:after:-translate-x-2/4 hover:after:bg-whiteBase/[.2] hover:after:text-whiteBase hover:after:rounded-md hover:after:z-10 hover:after:text-small hover:after:py-0.5 hover:after:px-1.5 hover:after:whitespace-nowrap hover:after:border hover:after:border-solid hover:after:border-whiteBase'
                : ''
            }`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
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
          <tr
            className={`relative ${
              showTooltip
                ? 'hover:after:content-["Precipitation_and_weather"] hover:after:absolute hover:after:block hover:after:-bottom-3 hover:after:left-2/4 hover:after:-translate-x-2/4 hover:after:bg-whiteBase/[.2] hover:after:text-whiteBase hover:after:rounded-md hover:after:z-10 hover:after:text-small hover:after:py-0.5 hover:after:px-1.5 hover:after:whitespace-nowrap hover:after:border hover:after:border-solid hover:after:border-whiteBase'
                : ''
            }`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
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
          <tr
            className={`relative ${
              showTooltip
                ? 'hover:after:content-["Humidity_(%)"] hover:after:absolute hover:after:block hover:after:-bottom-3 hover:after:left-2/4 hover:after:-translate-x-2/4 hover:after:bg-whiteBase/[.2] hover:after:text-whiteBase hover:after:rounded-md hover:after:z-10 hover:after:text-small hover:after:py-0.5 hover:after:px-1.5 hover:after:whitespace-nowrap hover:after:border hover:after:border-solid hover:after:border-whiteBase'
                : ''
            }`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
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

          <tr
            className={`relative ${
              showTooltip
                ? 'hover:after:content-["Pressure_(mm.Hg)"] hover:after:absolute hover:after:block hover:after:-bottom-3 hover:after:left-2/4 hover:after:-translate-x-2/4 hover:after:bg-whiteBase/[.2] hover:after:text-whiteBase hover:after:rounded-md hover:after:z-10 hover:after:text-small hover:after:py-0.5 hover:after:px-1.5 hover:after:whitespace-nowrap hover:after:border hover:after:border-solid hover:after:border-whiteBase'
                : ''
            }`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
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

          <tr
            title='Wind speed (m/s)'
            className={`relative ${
              showTooltip
                ? 'hover:after:content-["Wind_speed_(m/s)"] hover:after:absolute hover:after:block hover:after:-bottom-3 hover:after:left-2/4 hover:after:-translate-x-2/4 hover:after:bg-whiteBase/[.2] hover:after:text-whiteBase hover:after:rounded-md hover:after:z-10 hover:after:text-small hover:after:py-0.5 hover:after:px-1.5 hover:after:whitespace-nowrap hover:after:border hover:after:border-solid hover:after:border-whiteBase'
                : ''
            }`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <th title='Wind speed' scope='row' className='w-10 pr-2'>
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
        </tbody>
      </table>
    </div>
  );
};

export default WeatherDetailsForHours;
