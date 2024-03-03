import React, { FC } from 'react';

import { useWeatherAPI } from 'reduxStore/hooks';

import { HourlyWeatherData } from 'types';

import { ICON_SIZES } from 'constants/iconSizes';
import { useWindowWidth } from 'contexts';

import { Hint, SvgIcon } from 'ui';

import { convertUnixTimestampToHHMM, getWeatherTableForHours } from '../assistants';

const WeatherDetailsForHours: FC = () => {
  const { hourlyWeather } = useWeatherAPI();
  const { isMobile } = useWindowWidth();

  const rows = getWeatherTableForHours();

  return (
    <div
      className={`rows-[1/1] col-[1/1] flex h-full w-full bg-accentBase duration-500 ease-in backface-hidden rotate-y-180`}
    >
      <table className='h-full min-w-full border-separate border border-transparent bg-accentBase'>
        <thead className='h-10'>
          <Hint label='Time' side='top' sideOffset={0} ariaLabel='Time interval (3 hours)'>
            <tr>
              <th className='w-10 pr-2'>
                <SvgIcon
                  svgName='icon-time'
                  size={isMobile ? ICON_SIZES.smIcon20 : ICON_SIZES.mdIcon24}
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
                      className='-rotate-90 whitespace-nowrap text-center text-small text-whiteBase md:text-base hg:text-xl'
                    >
                      {convertedTime}
                    </th>
                  );
                })}
            </tr>
          </Hint>
        </thead>
        <tbody>
          {rows.map(({ label, icon, iconColorStyles, iconSize, renderCell }) => (
            <Hint
              key={icon}
              label={label}
              side='top'
              sideOffset={0}
              ariaLabel={`Info about ${label} by time interval`}
            >
              <tr>
                <th scope='row' className='w-10 pr-2'>
                  <SvgIcon
                    svgName={icon}
                    size={isMobile ? ICON_SIZES.smIcon20 : iconSize}
                    className={iconColorStyles}
                  />
                </th>
                {hourlyWeather &&
                  Array.isArray(hourlyWeather) &&
                  hourlyWeather.map((item: HourlyWeatherData) => (
                    <React.Fragment key={item?.dt}>{renderCell(item)}</React.Fragment>
                  ))}
              </tr>
            </Hint>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherDetailsForHours;
