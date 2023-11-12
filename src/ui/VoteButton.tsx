import React from 'react';
import SvgIcon from './SvgIcon';

interface VBProps {
  buttonData: {
    id?: string;
  };
  isFavourite: boolean;
  onHandleClick: (e: React.MouseEvent) => void;
}

const VoteButton = ({ onHandleClick, isFavourite, buttonData }: Partial<VBProps>) => {
  return (
    <button
      id={buttonData?.id}
      type='button'
      className='absolute z-20 bottom-3 right-2 flex items-center gap-1 rounded-3xl px-3 py-1.5 bg-contrastWhite group hover:bg-accentBase text-small text-darkBase font-medium hover:text-whiteBase transition-colors duration-500'
      onClick={onHandleClick}
    >
      {isFavourite ? 'Remove from favorite' : 'Add to favorite'}
      <SvgIcon
        svgName='icon-heart'
        size={16}
        className={`transition-colors duration-500 ${
          isFavourite
            ? 'stroke-none fill-accentBase'
            : 'stroke-accentBase fill-transparent hover:stroke-none hover:fill-accentBase'
        }`}
      />
    </button>
  );
};

export default VoteButton;
