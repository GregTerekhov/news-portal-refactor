import React, { useState } from 'react';
import { SvgIcon, VoteButton } from 'ui';
import PlugImage from './PlugImage';
import Loader from './Loader';
import { VotedItem } from 'types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addOrUpdateVotedNews, removeFromFavourites } from 'redux/newsDatabase/newsDataBaseSlice';
import { useLocation } from 'react-router-dom';
import { useActiveLinks } from 'hooks';
import { selectSavedNews } from 'redux/newsDatabase';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
  onChange: () => void;
  // onDelete: () => void;
}

const NewsItem: React.FC<Partial<NewsItemProps>> = ({
  liveNews = {},
  onChange = () => {},
  // onDelete = () => {},
}) => {
  const savedNews = useAppSelector(selectSavedNews);
  // console.log('savedNews', savedNews);
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

  // useEffect(() => {
  //   if (savedNews && liveNews?.newsUrl !== undefined) {
  //     if (savedNews?.length !== 0) {
  //       const existingNews = savedNews?.find((news) => news.newsUrl === liveNews?.newsUrl);
  //       const savedFavourite = existingNews?.isFavourite;
  //       const savedRead = existingNews?.hasRead;

  //       if (savedFavourite === true && savedRead === true) {
  //         console
  //           .log
  //           // `check: savedFavourite === true && savedRead === true on ${location.pathname}`,
  //           ();
  //         setIsFavourite(true);
  //         setHasRead(true);
  //       }
  //       if (savedFavourite === true && savedRead === false) {
  //         console
  //           .log
  //           // `check: savedFavourite === true && savedRead === false on ${location.pathname}`,
  //           ();
  //         setIsFavourite(true);
  //       }
  //       if (savedRead === true && savedFavourite === false) {
  //         console
  //           .log
  //           // `check: savedFavourite === false && savedRead === true on ${location.pathname}`,
  //           ();
  //         setHasRead(true);
  //       }
  //     } else {
  //       // console.log(`check return: savedNews?.length === 0 on ${location.pathname}`);
  //       return;
  //     }
  //   }
  // }, [savedNews]);

  const handleAddToFavourites = (e: React.MouseEvent) => {
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
        dispatch(addOrUpdateVotedNews(updatedData));
      } else {
        const existingNews = savedNews?.find((news) => news.newsUrl === liveNews.newsUrl);
        const savedFavourite = existingNews?.isFavourite;
        const savedRead = existingNews?.hasRead;

        if (!existingNews) {
          setIsFavourite(true);

          const updatedData = { ...liveNews, isFavourite: true, hasRead: false };
          console.log(
            `savedNews.length !== 0 && !existingNews updatedDataFavour: on ${location.pathname} `,
            updatedData,
          );
          dispatch(addOrUpdateVotedNews(updatedData));
        } else {
          if (savedFavourite === false && savedRead === true) {
            setIsFavourite(true);

            const updatedData = { ...liveNews, isFavourite: true, hasRead: savedRead };
            console.log(
              `savedNews.length !== 0 && existingNews.isFavourite === false updatedDataFavour: on ${location.pathname}`,
            );
            dispatch(addOrUpdateVotedNews(updatedData));
          } else if (savedFavourite === true && savedRead === false) {
            setIsFavourite(false);

            const updatedData = { ...liveNews, isFavourite: false, hasRead: savedRead };
            console.log(
              `savedNews.length !== 0 && existingNews.isFavourite === true updatedDataFavour: on ${location.pathname} and existingNews.isFavourite = ${liveNews.isFavourite}`,
              updatedData,
            );
            dispatch(removeFromFavourites(liveNews.newsUrl));
            dispatch(addOrUpdateVotedNews(updatedData));
            // onDelete();
          } else if (savedFavourite === true && savedRead === true) {
            setIsFavourite(false);

            const updatedData = { ...liveNews, isFavourite: false, hasRead: savedRead };
            console.log(
              `savedNews.length !== 0 && existingNews.isFavourite === true updatedDataFavour: on ${location.pathname}`,
            );
            dispatch(removeFromFavourites(liveNews.newsUrl));
            dispatch(addOrUpdateVotedNews(updatedData));
            // onDelete();
          }
        }
      }
    }
  };

  const handleReadNews = () => {
    if (savedNews && liveNews && liveNews?.newsUrl !== undefined) {
      if (savedNews.length === 0) {
        setHasRead(true);
        onChange();

        const updatedData = { ...liveNews, hasRead: true, isFavourite: false };
        // console.log('updatedDataRead', updatedData);
        dispatch(addOrUpdateVotedNews(updatedData));
      } else {
        const existingNews = savedNews?.find((news) => news.newsUrl === liveNews.newsUrl);
        const savedFavourite = existingNews?.isFavourite;
        const savedRead = existingNews?.hasRead;

        if (!existingNews) {
          setHasRead(true);
          onChange();

          const updatedData = { ...liveNews, hasRead: true, isFavourite: false };
          // console.log('updatedDataRead', updatedData);
          dispatch(addOrUpdateVotedNews(updatedData));
        } else {
          if (savedRead === false && savedFavourite === true) {
            setHasRead(true);
            onChange();

            const updatedData = {
              ...liveNews,
              hasRead: true,
              isFavourite: savedFavourite,
            };
            // console.log('updatedDataRead', updatedData);
            dispatch(addOrUpdateVotedNews(updatedData));
          } else if (savedRead === true) {
            return;
          }
        }
      }
    }
  };

  return (
    <>
      {liveNews && liveNews?.newsUrl ? (
        <a className='block' href={liveNews?.newsUrl} target='_blank' onClick={handleReadNews}>
          <div
            className={`${
              hasRead && activeLinks.isHomeActive
                ? 'absolute z-20 w-full h-full bg-foreground'
                : 'hidden'
            }`}
          ></div>
          <p className='absolute z-20 top-10 left-0 py-1 px-2 text-small font-medium text-contrastWhite bg-accentForeground rounded-r'>
            {liveNews?.category}
          </p>
          {hasRead && (
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
            <VoteButton onHandleClick={handleAddToFavourites} isFavourite={isFavourite} />
          </div>
          <div className='px-4 mt-4'>
            {/* <p>{data?.author}</p> */}
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
              <p className='text-base md:text-medium text-accentBase'>Click for read more...</p>
            </div>
          </div>
        </a>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default NewsItem;
