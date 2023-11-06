import React from 'react';
import SvgIcon from './SvgIcon';

type VBProps = {
  isFavourite: boolean;
  onHandleClick: (e: React.MouseEvent) => void;
};

const VoteButton = ({ onHandleClick, isFavourite }: VBProps) => {
  return (
    <button
      type='button'
      className='absolute z-20 bottom-3 right-2 flex items-center gap-1 rounded-3xl px-3 py-1.5 bg-contrastWhite group hover:bg-accentBase transition-colors duration-500'
      onClick={onHandleClick}
    >
      <span className='text-small text-darkBase font-medium group-hover:text-whiteBase transition-colors duration-500'>
        {isFavourite ? 'Remove from favorite' : 'Add to favorite'}
      </span>
      <SvgIcon
        svgName='icon-heart'
        size={16}
        className={`${
          isFavourite
            ? 'stroke-none fill-accentBase'
            : 'stroke-accentBase fill-transparent group-hover:stroke-whiteBase group-hover:fill-none'
        }`}
      />
    </button>
  );
};

export default VoteButton;
