import React, { FC } from 'react';

import { useWeatherAPIRedux } from 'reduxStore/hooks';
import { useWindowWidthContext } from 'contexts';

import { Hint, SvgIcon } from 'ui';

import { receiveCurrentDate, getWeatherDetailsForToday } from '../assistants';

const WeatherDetailsForToday: FC<{}> = () => {
  const { currentWeather } = useWeatherAPIRedux();
  const { isMobile } = useWindowWidthContext();

  const { days, dateNow } = receiveCurrentDate();

  const weatherDetails = getWeatherDetailsForToday(isMobile, currentWeather);

  return (
    <div className='rows-[1/1] col-[1/1] flex h-full w-full flex-col justify-between gap-3 backface-hidden'>
      <div className='mb-3 text-center hg:mb-5'>
        <span className='font-weather text-3.5xl text-contrastWhite md:text-4.5xl hg:text-5xl'>
          {days}
        </span>
        <p className='text-2.5xl font-weather text-contrastWhite md:text-3.5xl'>{dateNow}</p>
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
                >
                  <div
                    className={`flex items-center gap-3 text-base text-contrastWhite md:text-medium hg:text-2xl ${justifyItemClass}`}
                  >
                    <div
                      className={`${justifyItemClass === 'justify-end' ? 'order-last' : 'order-1'}`}
                    >
                      <SvgIcon svgName={icon} sizeKey={iconSize} className='fill-whiteBase' />
                    </div>
                    <p className='flex items-baseline gap-x-1 even:order-1'>
                      {value}
                      <span className='text-xs hg:text-small'>{subTextValue}</span>
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
