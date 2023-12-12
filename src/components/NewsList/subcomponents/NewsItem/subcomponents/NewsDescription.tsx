import React, { FC } from 'react';

import { VotedItem } from 'types';

import { SvgIcon } from 'ui';

interface NewsDescriptionProps {
  liveNews: Partial<VotedItem>;
}

const NewsDescription: FC<NewsDescriptionProps> = ({ liveNews }) => {
  return (
    <div className='px-4 mt-4'>
      <p className='text-small lg:text-base leading-tight text-darkBase dark:text-whiteBase mb-2 text-end line-clamp-1'>
        {liveNews?.author ? `By ${liveNews?.author}` : `${liveNews?.materialType}`}
      </p>
      <h2
        className={`h-[100px] md:h-[132px] mb-4 text-3xl md:text-4xl font-bold leading-tight tracking-mediumTight md:tracking-tighter line-clamp-3 dark:text-whiteBase`}
      >
        {liveNews?.title}
      </h2>
      <p className='h-[57px] md:h-[66px] text-base md:text-medium leading-tight line-clamp-3 text-darkBase dark:text-whiteBase mb-4'>
        {liveNews?.description}
      </p>
      <div className='flex justify-between'>
        <p className='text-base md:text-medium text-greyAlt'>{liveNews?.publishDate}</p>
        <div className='flex pr-2 items-center gap-2 bg-accentAlt dark:bg-transparent duration-500 transition-all translate-x-full rounded-2xl group-hover:translate-x-0 group-hover:bg-accentAlt'>
          <SvgIcon svgName='icon-double-arrow' size={16} className='fill-whiteBase' />
          <p className='text-base md:text-medium text-whiteBase transition-colors duration-500'>
            Click for read more...
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsDescription;
