import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useActiveLinks } from 'hooks';

const SkeletonEl: FC<{}> = () => {
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  return (
    <>
      <div
        className={`${
          activeLinks.isHomeActive ? 'mb-10 md:mb-12 lg:mb-[60px]' : ''
        } w-72 md:w-[353px] lg:w-[395px] hg:w-[442px] h-[630px] md:h-[675px] bg-contrastWhite/[.8] dark:bg-darkBase/[.4] overflow-hidden rounded-[10px] animate-pulse transition-colors duration-500`}
      >
        <div className='relative h-[395px] bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-[10px] mb-4 transition-colors duration-500'>
          <div className='absolute z-20 top-10 left-0 w-28 h-6 bg-greyBase/[.4] dark:bg-darkBackground/[.8] rounded-r transition-colors duration-500'></div>
          <div className='absolute z-20 bottom-3 right-2 w-[168px] md:w-32 h-7 rounded-3xl bg-greyBase/[.4] dark:bg-darkBackground/[.8] transition-colors duration-500'></div>
        </div>
        <div className='px-4 mb-5 space-y-3.5 md:space-y-3'>
          <div className='w-3/4 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] h-6 md:h-9 rounded-3xl transition-colors duration-500'></div>
          <div className='w-full bg-greyAlt/[.4] dark:bg-whiteBase/[.1] h-6 md:h-9 rounded-3xl transition-colors duration-500'></div>
          <div className='w-3/5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] h-6 md:h-9 rounded-3xl transition-colors duration-500'></div>
        </div>
        <div className='px-4 mb-5 space-y-[7px] md:space-y-2'>
          <div className='w-full h-3.5 md:h-4 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-3xl transition-colors duration-500'></div>
          <div className='w-full h-3.5 md:h-4 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-3xl transition-colors duration-500'></div>
          <div className='w-4/5 h-3.5 md:h-4 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-3xl transition-colors duration-500'></div>
        </div>
        <div className='px-4 flex justify-between'>
          <div className='w-[74px] h-3.5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-3xl transition-colors duration-500'></div>
          <div className='w-[70px] h-3.5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-3xl transition-colors duration-500'></div>
        </div>
      </div>
      {activeLinks.isHomeActive && (
        <div className='flex items-center justify-center gap-2'>
          <div className='w-14 md:w-28 h-10 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-[20px] transition-colors duration-500'></div>
          <div className='w-10 h-10 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500'></div>
          <div className='w-10 h-10 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500'></div>
          <div className='w-10 h-10 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500'></div>
          <div className='w-14 md:w-28 h-10 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-[20px] transition-colors duration-500'></div>
        </div>
      )}
    </>
  );
};

export default SkeletonEl;
