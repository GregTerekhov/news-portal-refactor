import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { VotedItem } from 'types';

import { useAppDispatch } from 'reduxStore/hooks';
import { addOrUpdateVotedNews, removeFromFavourites } from 'reduxStore/newsDatabase';

import { useActiveLinks, useNewsDBCollector } from 'hooks';

import { SvgIcon, VoteButton } from 'ui';

import PlugImage from './PlugImage';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
  onChange: (() => void) | undefined;
  // onDelete: () => void;
}

const NewsItem: React.FC<Partial<NewsItemProps>> = ({
  liveNews = {},
  onChange = () => {},
  // onDelete = () => {},
}) => {
  const { savedNews } = useNewsDBCollector();
  const [isFavourite, setIsFavourite] = useState<boolean>(() => {
    const existingNews = savedNews?.find((news) => news.newsUrl === liveNews?.newsUrl);
    return existingNews?.isFavourite ?? false;
  });
  const [hasRead, setHasRead] = useState<boolean>(() => {
    const existingNews = savedNews?.find((news) => news.newsUrl === liveNews?.newsUrl);
    return existingNews?.hasRead ?? false;
  });
  const dispatch = useAppDispatch();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const isLoggedIn = true;

  useEffect(() => {
    if (isLoggedIn && savedNews && liveNews?.newsUrl !== undefined) {
      if (savedNews?.length !== 0) {
        const existingNews = savedNews?.find((news) => news.newsUrl === liveNews?.newsUrl);
        const savedFavourite = existingNews?.isFavourite;
        const savedRead = existingNews?.hasRead;

        if (savedFavourite === true && savedRead === true) {
          setIsFavourite(true);
          setHasRead(true);
        }
        if (savedFavourite === true && savedRead === false) {
          setIsFavourite(true);
        }
        if (savedRead === true && savedFavourite === false) {
          setHasRead(true);
        }
      } else {
        return;
      }
    }
  }, [savedNews]);

  const handleAddToFavourites = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onChange();

    if (savedNews && liveNews && liveNews?.newsUrl !== undefined) {
      if (savedNews.length === 0) {
        setIsFavourite(true);

        const updatedData = { ...liveNews, isFavourite: true, hasRead: false };
        console.log(
          `savedNews.length === 0 updatedDataFavour: on ${location.pathname} ${liveNews.isFavourite}`,
        );
        await dispatch(addOrUpdateVotedNews(updatedData));
      } else {
        const existingNews = savedNews?.find((news) => news.newsUrl === liveNews.newsUrl);
        const savedFavourite = existingNews?.isFavourite;
        const savedRead = existingNews?.hasRead;

        if (!existingNews) {
          setIsFavourite(true);

          const updatedData = { ...liveNews, isFavourite: true, hasRead: false };
          console.log(
            `savedNews.length !== 0 && !existingNews, updatedDataFavour: on ${location.pathname} `,
            updatedData,
          );
          await dispatch(addOrUpdateVotedNews(updatedData));
        } else {
          if (savedFavourite === false && savedRead === true) {
            setIsFavourite(true);

            const updatedData = { ...liveNews, isFavourite: true, hasRead: savedRead };
            console.log(
              `savedNews.length !== 0 && existingNews.isFavourite === false, updatedDataFavour: on ${location.pathname}`,
            );
            await dispatch(addOrUpdateVotedNews(updatedData));
          } else if (savedFavourite === true && savedRead === false) {
            setIsFavourite(false);

            const updatedData = { ...liveNews, isFavourite: false, hasRead: savedRead };
            console.log(
              `savedNews.length !== 0 && existingNews.isFavourite === true, updatedDataFavour: on ${location.pathname} and existingNews.isFavourite = ${liveNews.isFavourite}`,
              updatedData,
            );
            dispatch(removeFromFavourites(liveNews.newsUrl));
            await dispatch(addOrUpdateVotedNews(updatedData));

            // onDelete();
          } else if (savedFavourite === true && savedRead === true) {
            setIsFavourite(false);

            const updatedData = { ...liveNews, isFavourite: false, hasRead: savedRead };
            console.log(
              `savedNews.length !== 0 && existingNews.isFavourite === true, updatedDataFavour: on ${location.pathname}`,
            );
            dispatch(removeFromFavourites(liveNews.newsUrl));
            await addOrUpdateVotedNews(updatedData);
            // onDelete();
          }
        }
      }
    }
  };

  const handleReadNews = async () => {
    if (savedNews && liveNews && liveNews?.newsUrl !== undefined) {
      if (savedNews.length === 0) {
        setHasRead(true);
        onChange();

        const updatedData = { ...liveNews, hasRead: true, isFavourite: false };
        await addOrUpdateVotedNews(updatedData);
      } else {
        const existingNews = savedNews?.find((news) => news.newsUrl === liveNews.newsUrl);
        const savedFavourite = existingNews?.isFavourite;
        const savedRead = existingNews?.hasRead;

        if (!existingNews) {
          setHasRead(true);
          onChange();

          const updatedData = { ...liveNews, hasRead: true, isFavourite: false };
          await dispatch(addOrUpdateVotedNews(updatedData));
        } else {
          if (savedRead === false && savedFavourite === true) {
            setHasRead(true);
            onChange();

            const updatedData = {
              ...liveNews,
              hasRead: true,
              isFavourite: savedFavourite,
            };
            await dispatch(addOrUpdateVotedNews(updatedData));
          } else if (savedRead === true) {
            return;
          }
        }
      }
    }
  };

  return (
    <>
      {liveNews && liveNews?.newsUrl && (
        <a
          className='block group transition-colors duration-500'
          href={liveNews?.newsUrl}
          target='_blank'
          onClick={handleReadNews}
        >
          <div
            className={`${
              isLoggedIn && hasRead && activeLinks.isHomeActive
                ? 'absolute z-20 w-full h-full bg-whiteBase/[.4]'
                : 'hidden'
            }`}
          ></div>
          <p className='absolute z-20 top-10 left-0 py-1 px-2 text-small font-medium text-contrastWhite bg-accentBase/[.7] rounded-r'>
            {liveNews?.category} / {liveNews?.materialType}
          </p>
          {isLoggedIn && hasRead && (
            <p className='absolute z-10 top-3.5 right-3.5 md:top-5 md:right-5 text-base font-bold text-readBase flex items-center gap-1'>
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
            {isLoggedIn && (
              <VoteButton
                onHandleClick={handleAddToFavourites}
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
