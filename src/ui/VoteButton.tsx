import React from 'react';
import SvgIcon from './SvgIcon';

let addToFavoriteTemplate = false;

const VoteButton = () => {
  return (
    //Фон черного цвета временно, до момента включения в карточку с новостями
    <button
      type='button'
      className='flex items-center gap-1  bg-black rounded-3xl px-3 py-1.5  '
    >
      <p className='text-white'>
        {addToFavoriteTemplate ? 'Add to favorite' : 'Remove from favorite'}
      </p>
      <SvgIcon svgName='icon-heart' size={16} stroke='blue' fill='none' />
    </button>
  );
};

export default VoteButton;
