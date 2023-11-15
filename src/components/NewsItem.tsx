import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';

import { VotedItem } from 'types';

import { useAppDispatch } from 'reduxStore/hooks';
import { removeFromFavourites } from 'reduxStore/newsDatabase';

import { useActiveLinks, useAuthCollector, useNewsDBCollector } from 'hooks';

import { PrimaryButton, SvgIcon, VoteButton } from 'ui';

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
  const { savedNews, updateSavedNews } = useNewsDBCollector();
  const { isLoggedIn } = useAuthCollector();
  const [isFavourite, setIsFavourite] = useState<boolean>(() => getIsFavourite());
  const [hasRead, setHasRead] = useState<boolean>(() => getHasRead());
  const dispatch = useAppDispatch();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  useEffect(() => {
    if (isLoggedIn && savedNews && liveNews?.newsUrl !== undefined) {
      if (savedNews?.length !== 0) {
        const existingNews = savedNews.find((news) => news.newsUrl === liveNews?.newsUrl);
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
  }, [savedNews, isLoggedIn, liveNews]);

  function getIsFavourite(): boolean {
    const existingNews = savedNews?.find((news) => news.newsUrl === liveNews?.newsUrl);
    return existingNews?.isFavourite ?? false;
  }

  function getHasRead(): boolean {
    const existingNews = savedNews?.find((news) => news.newsUrl === liveNews?.newsUrl);
    return existingNews?.hasRead ?? false;
  }

  const handleChangeFavourites = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onChange();

    if (savedNews && liveNews && liveNews?.newsUrl !== undefined) {
      const currentTime = new Date();
      const formattedTime = format(currentTime, 'dd-MM-yyyy HH:mm:ss');

      if (savedNews.length === 0) {
        setIsFavourite(true);

        const updatedData = {
          ...liveNews,
          isFavourite: true,
          hasRead: false,
          additionDate: formattedTime,
        };
        await updateSavedNews(updatedData);
      } else {
        const existingNews = savedNews?.find((news) => news.newsUrl === liveNews.newsUrl);
        const savedFavourite = existingNews?.isFavourite;
        const savedRead = existingNews?.hasRead;

        if (!existingNews) {
          setIsFavourite(true);

          const updatedData = {
            ...liveNews,
            isFavourite: true,
            hasRead: false,
            additionDate: formattedTime,
          };
          await updateSavedNews(updatedData);
        } else {
          if (savedFavourite === false && savedRead === true) {
            setIsFavourite(true);

            const updatedData = { ...liveNews, isFavourite: true, hasRead: savedRead };
            await updateSavedNews(updatedData);
          } else if (savedFavourite === true && savedRead === false) {
            setIsFavourite(false);

            const updatedData = {
              ...liveNews,
              isFavourite: false,
              hasRead: savedRead,
              additionDate: '',
            };
            dispatch(removeFromFavourites(liveNews.newsUrl));
            await updateSavedNews(updatedData);

            // onDelete();
          } else if (savedFavourite === true && savedRead === true) {
            setIsFavourite(false);

            const updatedData = { ...liveNews, isFavourite: false, hasRead: savedRead };
            dispatch(removeFromFavourites(liveNews.newsUrl));
            await updateSavedNews(updatedData);
            // onDelete();
          }
        }
      }
    }
  };

  const handleReadNews = async () => {
    if (savedNews && liveNews && liveNews?.newsUrl !== undefined) {
      const currentTime = new Date();
      const formattedTime = format(currentTime, 'dd-MM-yyyy HH:mm:ss');

      if (savedNews.length === 0) {
        setHasRead(true);
        onChange();

        const updatedData = {
          ...liveNews,
          hasRead: true,
          isFavourite: false,
          additionDate: formattedTime,
        };
        await updateSavedNews(updatedData);
      } else {
        const existingNews = savedNews?.find((news) => news.newsUrl === liveNews.newsUrl);
        const savedFavourite = existingNews?.isFavourite;
        const savedRead = existingNews?.hasRead;

        if (!existingNews) {
          setHasRead(true);
          onChange();

          const updatedData = {
            ...liveNews,
            hasRead: true,
            isFavourite: false,
            additionDate: formattedTime,
          };
          await updateSavedNews(updatedData);
        } else {
          if (savedRead === false && savedFavourite === true) {
            setHasRead(true);
            onChange();

            const updatedData = {
              ...liveNews,
              hasRead: true,
              isFavourite: savedFavourite,
            };
            await updateSavedNews(updatedData);
          } else if (savedRead === true) {
            return;
          }
        }
      }
    }
  };

  const handleDeleteNews = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Delete news');
  };

  return (
    <>
      {liveNews && liveNews?.newsUrl && (
        <a
          className='block group transition-colors duration-500'
          href={liveNews?.newsUrl}
          target='_blank'
          onClick={isLoggedIn ? handleReadNews : undefined}
        >
          <div
            className={`${
              (isLoggedIn && hasRead && activeLinks.isHomeActive) || activeLinks.isArchiveActive
                ? 'absolute z-20 w-full h-full bg-whiteBase/[.4]'
                : 'hidden'
            }`}
          ></div>
          {activeLinks.isArchiveActive ? (
            <PrimaryButton
              onHandleClick={handleDeleteNews}
              variant='Small'
              hasIcon={true}
              svgName='icon-close'
              svgSize={24}
              classNameIcon='stroke-whiteBase'
              ariaLabel='Delete news from archive button'
              classNameButton='absolute z-40 top-3 right-3 bg-accentBase/[.8] py-1.5'
            />
          ) : null}
          <p className='absolute z-20 top-10 left-0 py-1 px-2 text-small font-medium text-contrastWhite bg-accentBase/[.7] rounded-r'>
            {liveNews?.category} / {liveNews?.materialType}
          </p>
          {isLoggedIn && hasRead && (
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
            {isLoggedIn && (
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
