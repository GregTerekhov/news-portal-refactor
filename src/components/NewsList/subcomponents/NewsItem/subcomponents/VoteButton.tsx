import React, { FC, useState } from 'react';

import { ButtonType, IconName, IconSizes, type VotedItem } from 'types';

import { SvgIcon } from 'ui';

import { useActiveLinks } from 'hooks';
import { getButtonLabel, getIconStyles } from '../assistants';
import { useNews } from '../hooks';

interface IVotedButtonProps {
  id: string;
  isFavourite: boolean;
  liveNews: Partial<VotedItem>;
}

const VoteButton: FC<IVotedButtonProps> = ({ liveNews, isFavourite, id }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { handleChangeFavourites } = useNews({ liveNews });
  const { isArchiveActive } = useActiveLinks();

  const buttonText = getButtonLabel(isArchiveActive, isFavourite);
  const iconStyles = getIconStyles(isFavourite, isHovered, isArchiveActive);

  const buttonStyles = `absolute bottom-3 right-2 z-20 flex items-center gap-x-1 rounded-3xl bg-contrastWhite px-3 py-1.5 text-small font-medium text-darkBase transition-colors duration-500 lg:text-medium ${
    !isArchiveActive ? 'group hocus:bg-accentBase hocus:text-whiteBase' : ''
  }`;

  return (
    <button
      id={id}
      type={ButtonType.Submit}
      className={buttonStyles}
      onClick={handleChangeFavourites}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {buttonText}
      <SvgIcon
        svgName={IconName.VotedFavourite}
        sizeKey={IconSizes.xsIcon16}
        className={iconStyles}
      />
    </button>
  );
};

export default VoteButton;
