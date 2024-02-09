import React, { FC } from 'react';

import { VotedItem } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';

import { SvgIcon } from 'ui';

interface NewsDescriptionProps {
  liveNews: Partial<VotedItem>;
}

const NewsDescription: FC<NewsDescriptionProps> = ({ liveNews }) => {
  return (
    <div className='mt-4 px-4'>
      <p className='mb-2 line-clamp-1 text-end text-small leading-tight text-darkBase dark:text-whiteBase lg:text-base'>
        {liveNews?.author ? `By ${liveNews?.author}` : `${liveNews?.materialType}`}
      </p>
      <h2
        className={`h-100px md:h-132px mb-4 line-clamp-3 text-3xl font-bold leading-tight tracking-mediumTight dark:text-whiteBase md:text-4xl md:tracking-tighter`}
      >
        {liveNews?.title}
      </h2>
      <p className='h-57px md:h-66px mb-4 line-clamp-3 text-base leading-tight text-darkBase dark:text-whiteBase md:text-medium'>
        {liveNews?.description}
      </p>
      <div className='flex justify-between'>
        <p className='text-base text-greyAlt md:text-medium'>{liveNews?.publishDate}</p>
        <div className='flex translate-x-full items-center gap-2 rounded-2xl bg-accentAlt pr-2 transition-all group-hover:translate-x-0 group-hover:bg-accentAlt dark:bg-transparent'>
          <SvgIcon
            svgName='icon-double-arrow'
            size={ICON_SIZES.xsIcon16}
            className='fill-whiteBase'
          />
          <p className='text-base text-whiteBase transition-colors md:text-medium'>
            Click for read more...
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsDescription;
