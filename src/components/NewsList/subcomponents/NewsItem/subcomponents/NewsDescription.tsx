import React, { FC } from 'react';

import { IconName, IconSizes, type VotedItem } from 'types';

import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from 'ui';

interface INewsDescriptionProps {
  liveNews: Partial<VotedItem>;
}

const NewsDescription: FC<INewsDescriptionProps> = ({ liveNews }) => {
  const { isWideScreens } = useWindowWidthContext();

  const { author, materialType, title, description, publishDate } = liveNews;

  const authorClass =
    'mb-2 line-clamp-1 text-end text-small leading-tight text-darkBase dark:text-whiteBase lg:text-base hg:text-medium';
  const titleClass =
    'mb-4 line-clamp-3 h-100px text-3xl font-bold leading-tight tracking-mediumTight dark:text-whiteBase md:h-132px md:text-4xl md:tracking-tighter hg:h-[120px] hg:text-3.5xl';
  const descriptionClass =
    'mb-4 line-clamp-3 h-57px text-base leading-tight text-darkBase dark:text-whiteBase md:h-66px md:text-medium hg:h-[72px] hg:text-xl';
  const wrapperHintClass =
    'flex translate-x-full items-center gap-2 rounded-2xl bg-accentAlt pr-2 transition-all group-hover:translate-x-0 group-hover:bg-accentAlt dark:bg-transparent';

  return (
    liveNews && (
      <div className='mt-4 px-4'>
        <p className={authorClass}>{author ? `By ${author}` : `${materialType}`}</p>
        <h2 className={titleClass}>{title}</h2>
        <p className={descriptionClass}>{description}</p>
        <div className='flex justify-between'>
          <p className='text-base text-greyAlt md:text-medium hg:text-xl'>{publishDate}</p>
          <div className={wrapperHintClass}>
            <SvgIcon
              svgName={IconName.TriangleDouble}
              sizeKey={isWideScreens ? IconSizes.smIcon20 : IconSizes.xsIcon16}
              className='fill-whiteBase'
            />
            <p className='text-base text-whiteBase transition-colors md:text-medium hg:py-px hg:text-xl'>
              Click for read more...
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default NewsDescription;
