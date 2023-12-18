import React, { FC } from 'react';

import { useWindowWidth } from 'contexts';

import { Hint, SvgIcon } from 'ui';

import {
  convertUnixTimestampToHHMM,
  hPaToMmHg,
  formatKmToMetre,
  convertTimezone,
  getWindStrengthScale,
  receiveCurrentDate,
} from '../assistants';

import { useWeatherCollector } from '../hooks';

type DetailsRows = {
  icon: string;
  iconSize: number;
  value: string;
  label: string;
  hint: string;
  justifyItemClass: string;
  subTextValue: string;
};

const WeatherDetailsForToday: FC<{}> = () => {
  const { currentWeather } = useWeatherCollector();
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { days, dateNow } = receiveCurrentDate();
  const isMobile = breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile;

  const weatherDetails: DetailsRows[] = [
    {
      icon: 'icon-earth',
      iconSize: isMobile ? 16 : 24,
      value: `${convertTimezone(currentWeather?.timezone)}`,
      label: 'Greenwich mean time',
      hint: 'GMT time',
      justifyItemClass: 'justify-start',
      subTextValue: 'UTC',
    },
    {
      icon: 'icon-humidity',
      iconSize: isMobile ? 18 : 30,
      value: `${currentWeather?.main?.humidity}`,
      label: 'Humidity in percent',
      hint: 'Humidity (%)',
      justifyItemClass: 'justify-end',
      subTextValue: '%',
    },
    {
      icon: 'icon-pressure',
      iconSize: isMobile ? 18 : 30,
      value: `${hPaToMmHg(currentWeather?.main?.pressure)}`,
      label: 'Atmospheric pressure in mm Hg',
      hint: 'Atmospheric pressure (mm.Hg)',
      justifyItemClass: 'justify-start',
      subTextValue: 'mm.Hg',
    },
    {
      icon: 'icon-pressure',
      iconSize: isMobile ? 18 : 30,
      value: `${currentWeather?.main?.pressure}`,
      label: 'Atmospheric pressure in hPa',
      hint: 'Atmospheric pressure (HPa)',
      justifyItemClass: 'justify-end',
      subTextValue: 'hPa',
    },
    {
      icon: 'icon-sunrise',
      iconSize: isMobile ? 20 : 30,
      value: `${convertUnixTimestampToHHMM(currentWeather?.sys?.sunrise)}`,
      label: 'Sunrise time',
      hint: 'Sunrise time',
      justifyItemClass: 'justify-start',
      subTextValue: 'AM',
    },
    {
      icon: 'icon-sunset',
      iconSize: isMobile ? 20 : 30,
      value: `${convertUnixTimestampToHHMM(currentWeather?.sys?.sunset)}`,
      label: 'Sunset time',
      hint: 'Sunset time',
      justifyItemClass: 'justify-end',
      subTextValue: 'PM',
    },
    {
      icon: 'icon-eye-opened',
      iconSize: isMobile ? 20 : 30,
      value: `${formatKmToMetre(currentWeather?.visibility)}`,
      label: 'Road visibility',
      hint: 'Road visibility',
      justifyItemClass: 'justify-start',
      subTextValue: 'km',
    },
    {
      icon: 'icon-weather-wind',
      iconSize: isMobile ? 20 : 30,
      value: `${currentWeather?.wind?.speed}`,
      label: 'Wind speed in metre per seconds',
      hint: `Wind speed (m/s). (${getWindStrengthScale(
        currentWeather?.wind?.speed,
      )} on the Beaufort scale)`,
      justifyItemClass: 'justify-end',
      subTextValue: 'm/s',
    },
  ];

  return (
    <div className='w-full h-full backface-hidden col-[1/1] rows-[1/1] flex flex-col gap-3 justify-between'>
      <div className='text-center mb-3'>
        <p className='font-weather text-3.5xl md:text-4.5xl text-contrastWhite'>{days}</p>
        <p className='font-weather text-2.5xl md:text-3.5xl text-contrastWhite'>{dateNow}</p>
      </div>
      <ul className='grid grid-cols-2 grid-rows-2 gap-y-3.5'>
        {Array.isArray(weatherDetails) &&
          weatherDetails.map(
            ({ icon, iconSize, value, label, hint, justifyItemClass, subTextValue }) => (
              <li key={label}>
                <Hint
                  label={hint}
                  side='top'
                  align={justifyItemClass === 'justify-end' ? 'end' : 'start'}
                  sideOffset={4}
                  ariaLabel={`Info about ${label} for current time`}
                  contentClass='border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]'
                >
                  <div
                    className={` text-contrastWhite text-base md:text-medium flex gap-3 items-center ${justifyItemClass}`}
                  >
                    <div
                      className={`${justifyItemClass === 'justify-end' ? 'order-last' : 'order-1'}`}
                    >
                      <SvgIcon svgName={icon} size={iconSize} className='fill-whiteBase' />
                    </div>
                    <p className='even:order-1 flex items-baseline gap-x-1'>
                      {value}
                      <span className='text-xs'>{subTextValue}</span>
                    </p>
                  </div>
                </Hint>
              </li>
            ),
          )}
      </ul>
    </div>
  );
};

export default WeatherDetailsForToday;
