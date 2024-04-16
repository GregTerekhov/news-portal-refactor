import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { VariantButton } from 'types';
import { useAuthRedux } from 'reduxStore/hooks';

import { PrimaryButton } from 'ui';

interface NavigationErrorProps {
  anyServerError?: boolean | '' | 0 | null;
}

const NavigationErrorButtons: FC<NavigationErrorProps> = ({ anyServerError }) => {
  const { isAuthenticated } = useAuthRedux();

  const navigate = useNavigate();

  const handleGoHome = () => {
    if (anyServerError) return;

    navigate('/');
  };

  const handleGoBack = () => navigate(-1);

  return (
    <div
      className={`${
        isAuthenticated ? 'justify-between gap-5 md:gap-x-20 lg:gap-x-36' : 'justify-center'
      } flex items-center`}
    >
      {isAuthenticated && (
        <PrimaryButton
          variant={VariantButton.Primary}
          id='Redirect to previous page button'
          onHandleClick={handleGoBack}
        >
          Go back
        </PrimaryButton>
      )}
      <PrimaryButton
        variant={VariantButton.Primary}
        id='Redirect to home page button'
        onHandleClick={handleGoHome}
      >
        {isAuthenticated ? 'or Go Home' : 'Just Go Home'}
      </PrimaryButton>
    </div>
  );
};

export default NavigationErrorButtons;
