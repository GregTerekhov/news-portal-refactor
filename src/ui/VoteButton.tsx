import React, { useState } from 'react';
import SvgIcon from './SvgIcon';

const VoteButton = () => {
  const [addToFavoriteTemplate, setAddToFavoriteTemplate] = useState<boolean>(false);

  const onHandleClick = () => {
    setAddToFavoriteTemplate(!addToFavoriteTemplate);
  };

  return (
    <button
      type='button'
      className='border-solid border-2 border-black flex items-center gap-1 rounded-3xl px-3 py-1.5  '
      onClick={onHandleClick}
    >
      <span>{addToFavoriteTemplate ? 'Add to favorite' : 'Remove from favorite'}</span>
      <SvgIcon
        svgName={addToFavoriteTemplate ? 'icon-heart' : 'icon-filled-heart'}
        size={16}
        stroke='stroke-accentBase'
        fill='fill-none'
      />
    </button>
  );
};

export default VoteButton;
