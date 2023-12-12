import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { VotedItem } from 'types';

import { useActiveLinks, useAuthCollector } from 'hooks';

import { PlugImage, SvgIcon } from 'ui';

import { useNews } from './hooks';
import { DeleteNewsButton, NewsDescription, VoteButton } from './subcomponents';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
}

const NewsItem: FC<Partial<NewsItemProps>> = ({ liveNews = {} }) => {
  const { isAuthenticated } = useAuthCollector();
  const myButtonRef = React.createRef<HTMLButtonElement>();

  // const isAuthenticated = true;
  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { isFavourite, hasRead, handleChangeFavourites, handleReadNews, handleDeleteNews } =
    useNews({ liveNews, activeLinks });

  const locationShowHasReadStatus = activeLinks.isHomeActive || activeLinks.isArchiveActive;

  return (
    <>
      {liveNews && liveNews?.newsUrl && (
        <a
          rel='noopener noreferrer'
          className='block group transition-colors duration-500'
          href={liveNews?.newsUrl}
          target='_blank'
          onClick={isAuthenticated ? handleReadNews : undefined}
        >
          <div
            className={`${
              isAuthenticated && hasRead && locationShowHasReadStatus
                ? 'absolute z-20 w-full h-full bg-whiteBase/[.4]'
                : 'hidden'
            }`}
          ></div>
          {activeLinks.isArchiveActive ? (
            <DeleteNewsButton
              myButtonRef={myButtonRef}
              handleDeleteNews={handleDeleteNews}
              liveNews={liveNews}
            ></DeleteNewsButton>
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
              <>
                <VoteButton
                  onHandleClick={handleChangeFavourites}
                  isFavourite={isFavourite}
                  buttonData={{ id: `Add ${liveNews?.newsUrl} to favourites or remove from them` }}
                />
              </>
            )}
          </div>
          <NewsDescription liveNews={liveNews} />
        </a>
      )}
    </>
  );
};

export default NewsItem;