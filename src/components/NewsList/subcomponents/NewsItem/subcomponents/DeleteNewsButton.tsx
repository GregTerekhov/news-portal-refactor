import React, { FC, Ref } from 'react';

import { Hint, PrimaryButton } from 'ui';
import { VariantButton } from 'ui/PrimaryButton/PrimaryButton';

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
      contentClass='border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]'
    >
      <div>
        <PrimaryButton
          ref={myButtonRef}
          onHandleClick={handleOpenConfirm}
          variant={VariantButton.Small}
          hasIcon={true}
          svgName='icon-close'
          svgSize={24}
          classNameIcon='stroke-whiteBase'
          ariaLabel='Delete news from archive button'
          classNameButton='absolute z-40 top-3 right-3 bg-accentBase/[.8] py-1.5'
        />
      </div>
    </Hint>
  );
};

export default DeleteNewsButton;
