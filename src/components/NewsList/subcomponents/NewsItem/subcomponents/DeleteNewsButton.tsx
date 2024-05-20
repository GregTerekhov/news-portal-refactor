import React, { FC, Ref } from 'react';

import {
  IconName,
  IconSizes,
  TooltipAppearanceSide,
  TooltipSideOffset,
  VariantButton,
} from 'types';

import { Hint, PrimaryButton } from 'ui';

interface IDeleteButtonProps {
  myButtonRef: Ref<HTMLButtonElement>;
  handleOpenConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DeleteNewsButton: FC<IDeleteButtonProps> = ({ myButtonRef, handleOpenConfirm }) => {
  return (
    <Hint
      label='Delete news from archive'
      side={TooltipAppearanceSide.Bottom}
      sideOffset={TooltipSideOffset.Large}
      ariaLabel='Button for deleting news from archive'
    >
      <div>
        <PrimaryButton
          ref={myButtonRef}
          onHandleClick={handleOpenConfirm}
          variant={VariantButton.Small}
          hasIcon={true}
          svgName={IconName.Close}
          svgSize={IconSizes.mdIcon24}
          classNameIcon='stroke-whiteBase'
          ariaLabel='Delete news from archive button'
          classNameButton='absolute z-40 top-3 right-3 bg-accentBase/[.8] py-1.5'
        />
      </div>
    </Hint>
  );
};

export default DeleteNewsButton;
