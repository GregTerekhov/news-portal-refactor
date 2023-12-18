import React, { FC, ReactElement } from 'react';

import { HourlyWeatherData } from 'types';

import { useWindowWidth } from 'contexts';

import { Hint, SvgIcon } from 'ui';

import { convertUnixTimestampToHHMM } from '../assistants';
import { useWeatherCollector } from '../hooks';
import {
  RenderTemperatureCell,
  RenderWeatherIConCell,
  RenderHumidityCell,
  RenderPressureCell,
  RenderWindSpeedCell,
} from './RenderCells';

type TableRows = {
  label: string;
  icon: string;
  iconSize: number;
  iconColorStyles: string;
  renderCell: (item: HourlyWeatherData) => ReactElement;
};

const WeatherDetailsForHours: FC<{}> = () => {
  const { hourlyWeather } = useWeatherCollector();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const rows: TableRows[] = [
    {
      label: 'Temperature in °C',
      icon: 'icon-thermometer',
      iconSize: 24,
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderTemperatureCell,
    },
    {
      label: 'Precipitation and weather',
      icon: 'icon-sun',
      iconSize: 24,
      iconColorStyles: 'stroke-whiteBase fill-transparent',
      renderCell: RenderWeatherIConCell,
    },
    {
      label: 'Humidity (%)',
      icon: 'icon-humidity',
      iconSize: 28,
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderHumidityCell,
    },
    {
      label: 'Pressure (mm.Hg)',
      icon: 'icon-pressure',
      iconSize: 24,
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderPressureCell,
    },
    {
      label: 'Wind speed (m/s)',
      icon: 'icon-weather-wind',
      iconSize: 24,
      iconColorStyles: 'fill-whiteBase',
      renderCell: RenderWindSpeedCell,
    },
  ];

  return (
    <div
      className={`w-full h-full backface-hidden flex bg-accentBase duration-500 ease-in rotate-y-180 col-[1/1] rows-[1/1]`}
    >
      <table className='bg-accentBase min-w-full h-full border border-separate border-transparent'>
        <thead className='h-10'>
          <Hint
            label='Time'
            side='top'
            sideOffset={0}
            ariaLabel='Time interval (3 hours)'
            contentClass='border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]'
          >
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
              contentClass='border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]'
            >
              <tr>
                <th scope='row' className='w-10 pr-2'>
                  <SvgIcon
                    svgName={icon}
                    size={
                      breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile
                        ? 20
                        : iconSize
                    }
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
