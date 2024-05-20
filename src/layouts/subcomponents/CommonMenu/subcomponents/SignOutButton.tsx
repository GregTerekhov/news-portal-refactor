import React, { FC } from 'react';

import { IconName, IconSizes, ButtonType, VariantButton, PrimaryButtonId } from 'types';

import { useWindowWidthContext } from 'contexts';

import { PrimaryButton } from 'ui';

interface ISignOutButtonProps {
  handleSignOut: () => void;
}

const SignOutButton: FC<ISignOutButtonProps> = ({ handleSignOut }) => {
  const { isTV } = useWindowWidthContext();

  return (
    <PrimaryButton
      id={PrimaryButtonId.SignOut}
      type={ButtonType.Submit}
      classNameButton='border border-solid border-transparent dark:border-whiteBase'
      hasIcon={true}
      variant={VariantButton.Other}
      width='w-32 hg:w-36'
      svgName={IconName.SignOut}
      svgSize={isTV ? IconSizes.mdIcon27 : IconSizes.mdIcon24}
      classNameIcon='fill-whiteBase'
      onHandleClick={handleSignOut}
    >
      Sign Out
    </PrimaryButton>
  );
};

export default SignOutButton;
