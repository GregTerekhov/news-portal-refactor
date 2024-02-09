import React, { FC } from 'react';

import { ICON_SIZES } from 'constants/iconSizes';
import { useActiveLinks } from 'hooks';

import { SvgIcon } from 'ui';

interface VBProps {
  buttonData: {
    id?: string;
  };
  isFavourite: boolean;
  onHandleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const VoteButton: FC<VBProps> = ({ onHandleClick, isFavourite, buttonData }) => {
  const { isArchiveActive } = useActiveLinks();

  const onButHover = isFavourite
    ? 'fill-accentBase stroke-accentBase'
    : 'stroke-accentBase fill-none';

  return (
    <button
      id={buttonData?.id}
      type='button'
      className={`absolute bottom-3 right-2 z-20 flex items-center gap-1 rounded-3xl bg-contrastWhite px-3 py-1.5 ${onButHover} ${
        !isArchiveActive ? 'hover:bg-accentBase hover:stroke-whiteBase hover:text-whiteBase' : ''
      } text-small font-medium text-darkBase transition-colors`}
      onClick={onHandleClick}
    >
      {!isArchiveActive
        ? isFavourite
          ? 'Remove from favorite'
          : 'Add to favorite'
        : isFavourite
          ? 'Favourited'
          : 'Not in favourites'}
      <SvgIcon
        svgName='icon-heart'
        size={ICON_SIZES.xsIcon16}
        className={`fill-inherit stroke-inherit`}
      />
    </button>
  );
};

export default VoteButton;
