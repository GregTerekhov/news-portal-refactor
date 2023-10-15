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
      className='absolute top-335px right-2 flex items-center gap-1 rounded-3xl px-3 py-1.5 bg-whiteBase'
      onClick={onHandleClick}
    >
      <span>{addToFavoriteTemplate ? 'Remove from favorite' : 'Add to favorite'}</span>
      <SvgIcon
        svgName='icon-heart'
        size={16}
        stroke={addToFavoriteTemplate ? 'none' : 'blue'}
        fill={addToFavoriteTemplate ? 'blue' : 'none'}
      />
    </button>
  );
};

export default VoteButton;
