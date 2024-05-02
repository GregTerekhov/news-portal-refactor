import React, { FC, useState } from 'react';

import type { VotedItem } from 'types';

import { useActiveLinks } from 'hooks';

import { SvgIcon } from 'ui';

import { getButtonLabel, getIconStyles } from '../assistants';
import { useNews } from '../hooks';

interface VBProps {
  buttonData: {
    id?: string;
  };
  isFavourite: boolean;
  liveNews: Partial<VotedItem>;
}

const VoteButton: FC<VBProps> = ({ liveNews, isFavourite, buttonData }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { handleChangeFavourites } = useNews({ liveNews });
  const { isArchiveActive } = useActiveLinks();

  const buttonStyles = `absolute bottom-3 right-2 z-20 flex items-center gap-x-1 rounded-3xl bg-contrastWhite px-3 py-1.5 text-small font-medium text-darkBase transition-colors duration-500 lg:text-medium ${
    !isArchiveActive ? 'group hocus:bg-accentBase hocus:text-whiteBase' : ''
  }`;

  return (
    <button
      id={buttonData?.id}
      type='button'
      className={buttonStyles}
      onClick={handleChangeFavourites}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {getButtonLabel(isArchiveActive, isFavourite)}
      <SvgIcon
        svgName='heart'
        sizeKey='xsIcon16'
        className={getIconStyles(isFavourite, isHovered, isArchiveActive)}
      />
    </button>
  );
};

export default VoteButton;
