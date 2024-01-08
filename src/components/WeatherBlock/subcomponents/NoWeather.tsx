import React, { FC } from 'react';

import { PrimaryButton, SvgIcon } from 'ui';

import { useWeather } from '../hooks';

const NoWeather: FC = () => {
  const { hasGeolocationPermission, requestGeolocationPermission, statePermission } = useWeather();

  return (
    <>
      <h2 className='text-whiteBase text-medium md:text-2xl lg:text-4xl'>
        What a pity, this could be your weather
      </h2>
      <span className='mt-20 mb-28'>
        <SvgIcon svgName='icon-moon' size={156} className='fill-transparent stroke-greyBase' />
      </span>
      <PrimaryButton
        id='Geolocation permission button'
        variant='Primary'
        onHandleClick={requestGeolocationPermission}
        classNameButton='border border-solid border-whiteBase'
      >
        {!statePermission || statePermission === 'prompt'
          ? 'Give permission for your geolocation'
          : hasGeolocationPermission
            ? 'Get the weather for your region'
            : statePermission === 'denied' && 'Permission denied'}
      </PrimaryButton>
    </>
  );
};

export default NoWeather;
