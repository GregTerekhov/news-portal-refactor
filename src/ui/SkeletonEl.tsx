import React from 'react';

const SkeletonEl = () => {
  return (
    <div className='w-72 md:w-[353px] lg:w-[395px] hg:w-[442px] h-[630px] md:h-[675px] bg-contrastWhite/[.8] dark:bg-darkBase/[.4] overflow-hidden rounded-[10px] animate-pulse transition-colors duration-500'>
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
  );
};

export default SkeletonEl;
