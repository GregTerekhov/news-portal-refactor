import React, { FC } from 'react';

import type { VotedItem } from 'types';
import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from 'ui';

interface NewsDescriptionProps {
  liveNews: Partial<VotedItem>;
}

const NewsDescription: FC<NewsDescriptionProps> = ({ liveNews }) => {
  const { isWideScreens } = useWindowWidthContext();

  return (
    <div className='mt-4 px-4'>
      <p className='mb-2 line-clamp-1 text-end text-small leading-tight text-darkBase dark:text-whiteBase lg:text-base hg:text-medium'>
        {liveNews?.author ? `By ${liveNews?.author}` : `${liveNews?.materialType}`}
      </p>
      <h2 className='mb-4 line-clamp-3 h-100px text-3xl font-bold leading-tight tracking-mediumTight dark:text-whiteBase md:h-132px md:text-4xl md:tracking-tighter hg:h-[120px] hg:text-3.5xl'>
        {liveNews?.title}
      </h2>
      <p className='mb-4 line-clamp-3 h-57px text-base leading-tight text-darkBase dark:text-whiteBase md:h-66px md:text-medium hg:h-[72px] hg:text-xl'>
        {liveNews?.description}
      </p>
      <div className='flex justify-between'>
        <p className='text-base text-greyAlt md:text-medium hg:text-xl'>{liveNews?.publishDate}</p>
        <div className='flex translate-x-full items-center gap-2 rounded-2xl bg-accentAlt pr-2 transition-all group-hover:translate-x-0 group-hover:bg-accentAlt dark:bg-transparent'>
          <SvgIcon
            svgName='triangle-double'
            sizeKey={isWideScreens ? 'smIcon20' : 'xsIcon16'}
            className='fill-whiteBase'
          />
          <p className='text-base text-whiteBase transition-colors md:text-medium hg:py-px hg:text-xl'>
            Click for read more...
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsDescription;
