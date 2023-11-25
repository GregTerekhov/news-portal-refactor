import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { VotedItem } from 'types';

import { useActiveLinks, useAuthCollector } from 'hooks';

import { PrimaryButton, SvgIcon } from 'ui';

import PlugImage from '../PlugImage/PlugImage';

import { useNews } from './hooks';
import { VoteButton } from './subcomponents';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
  // onChange: (() => void) | undefined;
}

const NewsItem: FC<Partial<NewsItemProps>> = ({
  liveNews = {},
  // onChange = () => {},
}) => {
  const { isFavourite, hasRead, handleChangeFavourites, handleReadNews, handleDeleteNews } =
    useNews({ liveNews });
  const { isAuthenticated } = useAuthCollector();

  // const isAuthenticated = true;
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  return (
    <>
      {liveNews && liveNews?.newsUrl && (
        <a
          className='block group transition-colors duration-500'
          href={liveNews?.newsUrl}
          target='_blank'
          onClick={isAuthenticated ? handleReadNews : undefined}
        >
          <div
            className={`${
              (isAuthenticated && hasRead && activeLinks.isHomeActive) ||
              activeLinks.isArchiveActive
                ? 'absolute z-20 w-full h-full bg-whiteBase/[.4]'
                : 'hidden'
            }`}
          ></div>
          {activeLinks.isArchiveActive ? (
            <div>
              <PrimaryButton
                onHandleClick={handleDeleteNews}
                variant='Small'
                dataTooltipTarget={`tooltip-delete-${liveNews.newsUrl} news`}
                dataTooltipPlacement='left'
                tooltipText='Delete news from archive'
                hasIcon={true}
                svgName='icon-close'
                svgSize={24}
                classNameIcon='stroke-whiteBase'
                ariaLabel='Delete news from archive button'
                classNameButton='absolute z-40 top-3 right-3 bg-accentBase/[.8] py-1.5'
              />
            </div>
          ) : null}
          <p className='absolute z-20 top-10 left-0 py-1 px-2 text-small font-medium text-contrastWhite bg-accentBase/[.7] rounded-r'>
            {liveNews?.category} / {liveNews?.materialType}
          </p>
          {isAuthenticated && hasRead && (
            <p className='absolute z-10 top-3.5 right-14 md:top-5 text-base font-bold text-readBase flex items-center gap-1'>
              Already read
              <SvgIcon svgName='icon-check' size={18} className='fill-readBase' />
            </p>
          )}
          <div className='relative h-[395px] flex justify-center items-center overflow-hidden rounded-[10px]'>
            {liveNews && liveNews?.imgLink ? (
              <img
                className='rounded-xl max-w-none h-full absolute object-cover'
                src={liveNews?.imgLink}
                alt={liveNews?.imgAlt ? liveNews?.imgAlt : 'plug image'}
              />
            ) : (
              <PlugImage variant='card' />
            )}
            {isAuthenticated && (
              <VoteButton
                onHandleClick={handleChangeFavourites}
                isFavourite={isFavourite}
                buttonData={{ id: `Add ${liveNews?.newsUrl} to favourites or remove from them` }}
              />
            )}
          </div>
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
                <SvgIcon svgName='icon-arrow-direction-left' size={16} className='fill-whiteBase' />
                <p className='text-base md:text-medium text-whiteBase transition-colors duration-500'>
                  Click for read more...
                </p>
              </div>
            </div>
          </div>
        </a>
      )}
    </>
  );
};

export default NewsItem;
