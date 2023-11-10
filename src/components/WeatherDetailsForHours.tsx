import { convertUnixTimestampToHHMM } from 'helpers';
import { useWindowWidth } from 'hooks';
import React from 'react';
import { useAppSelector } from 'redux/hooks';
import { selectWeatherByHours } from 'redux/weather';
import { HourlyWeatherData } from 'types';
import { SvgIcon } from 'ui';

const WeatherDetailsForHours = () => {
  const weatherByHours: HourlyWeatherData | [] = useAppSelector(selectWeatherByHours);
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  return (
    <div
      className={`w-full h-full backface-hidden flex bg-accentBase duration-500 ease-in rotate-y-180 col-[1/1] rows-[1/1]`}
      // onClick={weatherSlideChange}
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
            {weatherByHours &&
              Array.isArray(weatherByHours) &&
              weatherByHours?.map((item: HourlyWeatherData) => {
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
            {weatherByHours &&
              Array.isArray(weatherByHours) &&
              weatherByHours?.map((item: HourlyWeatherData) => {
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
            {weatherByHours &&
              Array.isArray(weatherByHours) &&
              weatherByHours?.map((item: HourlyWeatherData) => {
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
          <tr>
            <th scope='row' className='w-10 pr-2'>
              <SvgIcon
                svgName='icon-humidity'
                size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 28}
                className='fill-whiteBase'
              />
            </th>
            {weatherByHours &&
              Array.isArray(weatherByHours) &&
              weatherByHours?.map((item: HourlyWeatherData) => {
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

          <tr>
            <th scope='row' className='w-10 pr-2'>
              <SvgIcon
                svgName='icon-pressure'
                size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
                className='fill-whiteBase'
              />
            </th>
            {weatherByHours &&
              Array.isArray(weatherByHours) &&
              weatherByHours?.map((item: HourlyWeatherData) => {
                return (
                  <td
                    key={item?.dt}
                    className='py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center'
                  >
                    {item?.main?.pressure}
                  </td>
                );
              })}
          </tr>
          <tr>
            <th scope='row' className='w-10 pr-2'>
              <SvgIcon
                svgName='icon-weather-wind'
                size={breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24}
                className='fill-whiteBase'
              />
            </th>
            {weatherByHours &&
              Array.isArray(weatherByHours) &&
              weatherByHours?.map((item: HourlyWeatherData) => {
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
