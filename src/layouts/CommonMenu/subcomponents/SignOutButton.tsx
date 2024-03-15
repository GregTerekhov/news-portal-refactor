import React, { FC } from 'react';

import { VariantButton } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';
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
      width='w-32'
      svgName='signout'
      svgSize={isTV ? ICON_SIZES.mdIcon27 : ICON_SIZES.mdIcon24}
      classNameIcon='fill-whiteBase'
      onHandleClick={handleSignOut}
    >
      Sign Out
    </PrimaryButton>
  );
};

export default SignOutButton;
