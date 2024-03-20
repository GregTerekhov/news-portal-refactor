import React, { FC } from 'react';

import { VariantButton } from 'types';

import { PrimaryButton, SvgIcon } from 'ui';

import { useWeather } from '../hooks';

type NoWeatherProps = {
  showError: boolean | null | undefined;
};

const NoWeather: FC<NoWeatherProps> = ({ showError }) => {
  const { requestGeolocationPermission, showButtonText } = useWeather();

  const showInfoMessage = showError
    ? 'Server error. Please try again later when you reload the page'
    : 'What a pity, this could be your weather';

  return (
    <>
      <h2 className='text-medium text-whiteBase md:text-2xl lg:text-4xl'>{showInfoMessage}</h2>
      <div className={`my-auto ${showError ? 'flex justify-center' : ''}`}>
        <SvgIcon
          svgName='moon'
          sizeKey='ultraIcon156'
          className='fill-transparent stroke-greyBase'
        />
      </div>
      {!showError && (
        <PrimaryButton
          id='Geolocation permission button'
          variant={VariantButton.Primary}
          onHandleClick={requestGeolocationPermission}
          classNameButton='border border-solid border-whiteBase'
        >
          {showButtonText()}
        </PrimaryButton>
      )}
    </>
  );
};

export default NoWeather;
