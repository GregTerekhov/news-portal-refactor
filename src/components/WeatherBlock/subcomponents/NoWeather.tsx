import React, { FC } from 'react';

import { IconName, IconSizes, PrimaryButtonId, VariantButton } from 'types';

import { PrimaryButton, SvgIcon } from 'ui';

import { useWeather } from '../hooks';

interface INoWeatherProps {
  showError: number | null;
}

const NoWeather: FC<INoWeatherProps> = ({ showError }) => {
  const { requestGeolocationPermission, showButtonText } = useWeather();

  //Визначення тексту в залежності від наявності помилки від серверу, або дефолтного значення
  const showInfoMessage = showError
    ? 'Server error. Please try again later when you reload the page'
    : 'What a pity, this could be your weather';

  return (
    <>
      <h2 className='text-medium text-whiteBase md:text-2xl lg:text-4xl'>{showInfoMessage}</h2>
      <div className={`my-auto ${showError ? 'flex justify-center' : ''}`}>
        <SvgIcon
          svgName={IconName.Moon}
          sizeKey={IconSizes.ultraIcon156}
          className='fill-transparent stroke-greyBase'
        />
      </div>
      {!showError && (
        <PrimaryButton
          id={PrimaryButtonId.GeoPermission}
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
