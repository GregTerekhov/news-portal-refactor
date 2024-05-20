import React, { FC } from 'react';

import {
  IconName,
  IconSizes,
  TooltipAppearanceSide,
  TooltipSideOffset,
  type HourlyWeatherData,
} from 'types';

import { useWeatherAPIRedux } from 'reduxStore/hooks';
import { useWindowWidthContext } from 'contexts';

import { Hint, SvgIcon } from 'ui';

import { getWeatherHoursObject, getWeatherTableForHours } from '../assistants';

const WeatherDetailsForHours: FC<{ isCelsius: boolean }> = ({ isCelsius }) => {
  const { hourlyWeather } = useWeatherAPIRedux();
  const { isSmallScreens } = useWindowWidthContext();

  const rows = getWeatherTableForHours(isCelsius);

  return (
    <div className='rows-[1/1] col-[1/1] flex h-full w-full bg-accentBase duration-500 ease-in backface-hidden rotate-y-180'>
      <table className='h-full min-w-full border-separate border border-transparent bg-accentBase'>
        <thead className='h-10'>
          <Hint
            label='Time'
            side={TooltipAppearanceSide.Top}
            sideOffset={TooltipSideOffset.Zero}
            ariaLabel='Time interval (3 hours)'
          >
            <tr>
              <th className='w-10 pr-2'>
                <SvgIcon
                  svgName={IconName.Clock}
                  sizeKey={isSmallScreens ? IconSizes.smIcon20 : IconSizes.mdIcon24}
                  className='fill-whiteBase'
                />
              </th>
              {Array.isArray(hourlyWeather) &&
                hourlyWeather?.map((item: HourlyWeatherData) => (
                  <th
                    key={getWeatherHoursObject(item).timeScale}
                    scope='col'
                    className='-rotate-90 whitespace-nowrap text-center text-small text-whiteBase md:text-base hg:text-xl'
                  >
                    {getWeatherHoursObject(item).convertedTimeScale}
                  </th>
                ))}
            </tr>
          </Hint>
        </thead>
        <tbody>
          {rows.map(({ hint, ariaLabel, icon, iconColorStyles, iconSize, renderCell }) => (
            <Hint
              key={icon}
              label={hint}
              side={TooltipAppearanceSide.Top}
              sideOffset={TooltipSideOffset.Zero}
              ariaLabel={`Info about ${ariaLabel} by time interval`}
            >
              <tr>
                <th scope='row' className='w-10 pr-2'>
                  <SvgIcon
                    svgName={icon}
                    sizeKey={isSmallScreens ? IconSizes.smIcon20 : iconSize}
                    className={iconColorStyles}
                  />
                </th>
                {hourlyWeather &&
                  Array.isArray(hourlyWeather) &&
                  hourlyWeather.map((item: HourlyWeatherData) => (
                    <React.Fragment key={getWeatherHoursObject(item).timeScale}>
                      {renderCell(item, isCelsius)}
                    </React.Fragment>
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
