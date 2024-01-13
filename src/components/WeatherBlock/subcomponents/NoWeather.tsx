import React, { FC } from 'react';

import { VariantButton } from 'types';

import { PrimaryButton, SvgIcon } from 'ui';

import { useWeather } from '../hooks';

type NoWeatherProps = {
  showError: boolean | null | undefined;
};

const NoWeather: FC<NoWeatherProps> = ({ showError }) => {
  const { hasGeolocationPermission, requestGeolocationPermission, statePermission } = useWeather();

  return (
    <>
      <h2 className='text-whiteBase text-medium md:text-2xl lg:text-4xl'>
        {showError
          ? 'Server error. Please try again later when you reload the page'
          : 'What a pity, this could be your weather'}
      </h2>
      <span className={`mt-20 ${showError ? 'flex justify-center' : 'block mb-28'}`}>
        <SvgIcon svgName='icon-moon' size={156} className='fill-transparent stroke-greyBase' />
      </span>
      {!showError && (
        <PrimaryButton
          id='Geolocation permission button'
          variant={VariantButton.Primary}
          onHandleClick={requestGeolocationPermission}
          classNameButton='border border-solid border-whiteBase'
        >
          {!statePermission || statePermission === 'prompt'
            ? 'Give permission for your geolocation'
            : hasGeolocationPermission
              ? 'Get the weather for your region'
              : statePermission === 'denied' && 'Permission denied'}
        </PrimaryButton>
      )}
    </>
  );
};

export default NoWeather;
