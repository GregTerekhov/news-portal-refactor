import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const { isArchiveActive } = useActiveLinks(location);

  const onButHover = isFavourite
    ? 'fill-accentBase stroke-accentBase'
    : 'stroke-accentBase fill-none';

  return (
    <button
      id={buttonData?.id}
      type='button'
      className={`absolute z-20 bottom-3 right-2 flex items-center gap-1 rounded-3xl px-3 py-1.5 bg-contrastWhite ${onButHover} ${
        !isArchiveActive ? 'hover:stroke-whiteBase hover:bg-accentBase hover:text-whiteBase' : ''
      } text-small text-darkBase font-medium transition-colors duration-250`}
      onClick={onHandleClick}
    >
      {!isArchiveActive
        ? isFavourite
          ? 'Remove from favorite'
          : 'Add to favorite'
        : isFavourite
          ? 'Favourited'
          : 'Not in favourites'}
      <SvgIcon svgName='icon-heart' size={16} className={`stroke-inherit fill-inherit`} />
    </button>
  );
};

export default VoteButton;
