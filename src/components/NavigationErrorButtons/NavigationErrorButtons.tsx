import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths, PrimaryButtonId, VariantButton } from 'types';

import { useAuthRedux } from 'reduxStore/hooks';

import { PrimaryButton } from 'ui';

const NavigationErrorButtons: FC = () => {
  const { isAuthenticated } = useAuthRedux();

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(Paths.Home);
  };

  const handleGoBack = () => navigate(-1);

  return (
    <div
      className={`flex items-center ${
        isAuthenticated ? 'justify-between gap-5 md:gap-x-20 lg:gap-x-36' : 'justify-center'
      }`}
    >
      {isAuthenticated && (
        <PrimaryButton
          variant={VariantButton.Primary}
          id={PrimaryButtonId.RedirectToPrevious}
          onHandleClick={handleGoBack}
        >
          Go back
        </PrimaryButton>
      )}
      <PrimaryButton
        variant={VariantButton.Primary}
        id={PrimaryButtonId.RedirectToHome}
        onHandleClick={handleGoHome}
      >
        {isAuthenticated ? 'or Go Home' : 'Just Go Home'}
      </PrimaryButton>
    </div>
  );
};

export default NavigationErrorButtons;
