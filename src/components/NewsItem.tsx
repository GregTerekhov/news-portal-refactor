import React, { useEffect, useState } from 'react';
import { SvgIcon, VoteButton } from 'ui';
import PlugImage from './PlugImage';
import Loader from './Loader';
import { VotedItem } from 'types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectAllNews } from 'redux/newsDatabase';
import { addOrUpdateVotedNews } from 'redux/newsDatabase/newsDataBaseSlice';
import { useLocation } from 'react-router-dom';

interface NewsItemProps {
  data: Partial<VotedItem>;
  onChange: () => void;
}

const NewsItem: React.FC<Partial<NewsItemProps>> = ({ data = {}, onChange = () => {} }) => {
  const savedNews = useAppSelector(selectAllNews);

  const [isFavourite, setIsFavourite] = useState<boolean>(() => {
    const existingNews = savedNews?.find((news) => news.newsUrl === data?.newsUrl);
    return existingNews?.isFavourite ?? false;
  });
  const [hasRead, setHasRead] = useState<boolean>(() => {
    const existingNews = savedNews?.find((news) => news.newsUrl === data?.newsUrl);
    return existingNews?.hasRead ?? false;
  });
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (savedNews && data?.newsUrl !== undefined) {
      if (savedNews?.length !== 0) {
        const existingNews = savedNews?.find((news) => news.newsUrl === data?.newsUrl);
        const savedFavourite = existingNews?.isFavourite;
        const savedRead = existingNews?.hasRead;

        if (savedFavourite === true && savedRead === true) {
          // console.log('check: savedFavourite === true && savedRead === true');
          setIsFavourite(true);
          setHasRead(true);
        }
        if (savedFavourite === true && savedRead === false) {
          // console.log('check: savedFavourite === true && savedRead === false');
          setIsFavourite(true);
        }
        if (savedRead === true && savedFavourite === false) {
          // console.log('check: savedFavourite === false && savedRead === true');
          setHasRead(true);
        }
      } else {
        // console.log('check return: savedNews?.length === 0');
        return;
      }
    }
  }, [savedNews]);

  const handleAddToFavourites = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onChange();

    if (savedNews && data && data?.newsUrl !== undefined) {
      if (savedNews.length === 0) {
        setIsFavourite(true);

        const updatedData = { ...data, isFavourite: true, hasRead: false };
        // console.log('savedNews.length === 0 updatedDataFavour: ', updatedData);
        dispatch(addOrUpdateVotedNews(updatedData));
      } else {
        const existingNews = savedNews?.find((news) => news.newsUrl === data.newsUrl);
        const savedFavourite = existingNews?.isFavourite;
        const savedRead = existingNews?.hasRead;

        if (!existingNews) {
          setIsFavourite(true);

          const updatedData = { ...data, isFavourite: true, hasRead: false };
          // console.log('savedNews.length !== 0 && !existingNews updatedDataFavour: ', updatedData);
          dispatch(addOrUpdateVotedNews(updatedData));
        } else {
          if (savedFavourite === false && savedRead === true) {
            setIsFavourite(true);

            const updatedData = { ...data, isFavourite: true, hasRead: savedRead };
            // console.log(
            //   'savedNews.length !== 0 && existingNews.isFavourite === false updatedDataFavour: ',
            //   updatedData,
            // );
            dispatch(addOrUpdateVotedNews(updatedData));
          } else if (savedFavourite === true && savedRead === false) {
            setIsFavourite(false);

            const updatedData = { ...data, isFavourite: false, hasRead: savedRead };
            // console.log(
            //   'savedNews.length !== 0 && existingNews.isFavourite === true updatedDataFavour: ',
            //   updatedData,
            // );
            dispatch(addOrUpdateVotedNews(updatedData));
          } else if (savedFavourite === true && savedRead === true) {
            setIsFavourite(false);

            const updatedData = { ...data, isFavourite: false, hasRead: savedRead };
            // console.log(
            //   'savedNews.length !== 0 && existingNews.isFavourite === true updatedDataFavour: ',
            //   updatedData,
            // );
            dispatch(addOrUpdateVotedNews(updatedData));
          }
        }
      }
    }
  };

  const handleReadNews = () => {
    if (savedNews && data && data?.newsUrl !== undefined) {
      if (savedNews.length === 0) {
        setHasRead(true);
        onChange();

        const updatedData = { ...data, hasRead: true, isFavourite: false };
        // console.log('updatedDataRead', updatedData);
        dispatch(addOrUpdateVotedNews(updatedData));
      } else {
        const existingNews = savedNews?.find((news) => news.newsUrl === data.newsUrl);
        const savedFavourite = existingNews?.isFavourite;
        const savedRead = existingNews?.hasRead;

        if (!existingNews) {
          setHasRead(true);
          onChange();

          const updatedData = { ...data, hasRead: true, isFavourite: false };
          // console.log('updatedDataRead', updatedData);
          dispatch(addOrUpdateVotedNews(updatedData));
        } else {
          if (savedRead === false && savedFavourite === true) {
            setHasRead(true);
            onChange();

            const updatedData = {
              ...data,
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
      {data && data?.newsUrl ? (
        <a className='block' href={data?.newsUrl} target='_blank' onClick={handleReadNews}>
          <div
            className={`${
              hasRead && isHomePage ? 'absolute z-20 w-full h-full bg-foreground' : 'hidden'
            }`}
          ></div>
          <p className='absolute z-20 top-10 left-0 py-1 px-2 text-small font-medium text-contrastWhite bg-accentForeground rounded-r'>
            {data?.category}
          </p>
          {hasRead && (
            <p className='absolute z-10 top-3.5 right-3.5 md:top-5 md:right-5 text-base font-bold text-readBase flex items-center gap-1'>
              Already read
              <SvgIcon svgName='icon-check' size={18} className='fill-readBase' />
            </p>
          )}
          <div className='relative h-395px flex justify-center items-center overflow-hidden rounded-[10px]'>
            {data && data?.imgLink ? (
              <img
                className='rounded-xl max-w-none h-full absolute object-cover'
                src={data?.imgLink}
                alt={data?.imgAlt ? data?.imgAlt : 'plug image'}
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
              {data?.title}
            </h2>
            <p className='h-[57px] md:h-[66px] text-base md:text-medium leading-tight line-clamp-3 text-darkBase dark:text-whiteBase mb-4'>
              {data?.description}
            </p>
            <div className='flex justify-between'>
              <p className='text-base md:text-medium text-greyAlt'>{data?.publishDate}</p>
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
