import React, { FC } from 'react';

import { useActiveLinks } from 'hooks';

import { SvgIcon } from 'ui';

type ButtonLabel =
  | 'Remove from favorite'
  | 'Add to favorite'
  | 'Favourited'
  | 'Not in favourites'
  | undefined;

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

  const buttonStyles = `absolute bottom-3 right-2 z-20 flex items-center gap-x-1 rounded-3xl bg-contrastWhite px-3 py-1.5 ${onButHover} ${
    !isArchiveActive ? 'group hover:bg-accentBase hover:text-whiteBase' : ''
  } text-small font-medium text-darkBase transition-colors duration-500 lg:text-medium`;

  const getButtonLabel = (): ButtonLabel => {
    switch (true) {
      case !isArchiveActive && isFavourite:
        return 'Remove from favorite';
      case !isArchiveActive && !isFavourite:
        return 'Add to favorite';
      case isArchiveActive && isFavourite:
        return 'Favourited';
      case isArchiveActive && !isFavourite:
        return 'Not in favourites';

      default:
        return;
    }
  };

  return (
    <button id={buttonData?.id} type='button' className={`${buttonStyles}`} onClick={onHandleClick}>
      {getButtonLabel()}
      <SvgIcon
        svgName='heart'
        sizeKey='xsIcon16'
        className={`fill-inherit ${!isArchiveActive ? 'group-hover:stroke-whiteBase' : ''} `}
      />
    </button>
  );
};

export default VoteButton;
