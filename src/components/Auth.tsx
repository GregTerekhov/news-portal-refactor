import React from 'react';
import { PrimaryButton } from 'ui';
import { PB } from 'ui/PrimaryButton';

const Auth = () => {
  return (
    <div>
      <PrimaryButton buttonData={{ type: 'button' }} variant={PB.Other}>
        Signin/Signup
      </PrimaryButton>
    </div>
  );
};

export default Auth;
