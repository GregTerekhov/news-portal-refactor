import React, { FC } from 'react';

import { VariantButton } from 'types';
import { useWindowWidth } from 'contexts';

import { PrimaryButton } from 'ui';

interface SignOutButtonProps {
  handleSignOut: () => void;
}

const SignOutButton: FC<SignOutButtonProps> = ({ handleSignOut }) => {
  const { isTV } = useWindowWidth();
  return (
    <PrimaryButton
      id='Sign out button'
      classNameButton='border border-solid border-transparent dark:border-whiteBase'
      hasIcon={true}
      variant={VariantButton.Other}
      width='w-32 hg:w-36'
      svgName='signout'
      svgSize={isTV ? 'mdIcon27' : 'mdIcon24'}
      classNameIcon='fill-whiteBase'
      onHandleClick={handleSignOut}
    >
      Sign Out
    </PrimaryButton>
  );
};

export default SignOutButton;
