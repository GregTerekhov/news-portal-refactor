import React, { FC, Ref } from 'react';

import { VotedItem } from 'types';

import { Hint, PrimaryButton } from 'ui';

interface DeleteButtonProps {
  myButtonRef: Ref<HTMLButtonElement>;
  handleDeleteNews: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => Promise<void>;
  liveNews: Partial<VotedItem>;
}

const DeleteNewsButton: FC<DeleteButtonProps> = ({ myButtonRef, handleDeleteNews, liveNews }) => {
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
          onHandleClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleDeleteNews(e, liveNews?._id || '')
          }
          variant='Small'
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
