import React, { FC, Ref } from 'react';

import { VariantButton } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';

import { Hint, PrimaryButton } from 'ui';

interface DeleteButtonProps {
  myButtonRef: Ref<HTMLButtonElement>;
  handleOpenConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DeleteNewsButton: FC<DeleteButtonProps> = ({ myButtonRef, handleOpenConfirm }) => {
  return (
    <Hint
      label='Delete news from archive'
      side='bottom'
      sideOffset={16}
      ariaLabel='Delete news from archive'
    >
      <div>
        <PrimaryButton
          ref={myButtonRef}
          onHandleClick={handleOpenConfirm}
          variant={VariantButton.Small}
          hasIcon={true}
          svgName='icon-close'
          svgSize={ICON_SIZES.mdIcon24}
          classNameIcon='stroke-whiteBase'
          ariaLabel='Delete news from archive button'
          classNameButton='absolute z-40 top-3 right-3 bg-accentBase/[.8] py-1.5'
        />
      </div>
    </Hint>
  );
};

export default DeleteNewsButton;
