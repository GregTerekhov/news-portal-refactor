import React, { useEffect, useRef, useState } from 'react';
import { SvgIcon, VoteButton } from 'ui';
import { useAppDispatch } from 'redux/hooks';
import { addOrUpdateVotedNews } from 'redux/votedNewsSlice';
import PlugImage from './PlugImage';
import Loader from './Loader';
import { updateLocaleStorage } from 'helpers';
import { PopularNewsItem, VotedItem } from 'types';

const NewsItem = ({ data }: { data: Partial<PopularNewsItem> }) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [hasRead, setHasRead] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const dataIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (data && data?.id) {
      if (dataIdRef.current === null) {
        dataIdRef.current = data.id;
      }
      const savedFavourites = JSON.parse(localStorage.getItem('isFavourite') || '{}');
      const savedReads = JSON.parse(localStorage.getItem('hasRead') || '{}');

      const idFKeys = Object.keys(savedFavourites);
      const idRKeys = Object.keys(savedReads);

      if (dataIdRef.current) {
        if (idFKeys.includes(data.id.toString())) {
          setIsFavourite(true);
        } else {
          setIsFavourite(false);
        }
        if (idRKeys.includes(data.id.toString())) {
          setHasRead(true);
        } else {
          setHasRead(false);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (isClicked || hasRead) {
        const changedData: VotedItem = {
          id: data?.id ?? -1,
          isFavourite: isFavourite,
          hasRead: hasRead,
          title: data?.title ?? '',
          description: data?.abstract,
          publishDate: data?.published_date ?? '',
          category: data?.section ?? '',
          edition: data?.source ?? '',
          newsUrl: data?.url ?? '',
          imgLink: data?.media?.[0]?.['media-metadata']?.[2]?.url as string,
          imgAlt: data?.media?.[0]?.caption ?? '',
          author: data?.byline ? data.byline.replace(/^By\s+/i, '') : '',
        };
        console.log('changedData', changedData);
        dispatch(addOrUpdateVotedNews(changedData));
      }
    }
  }, [isClicked, hasRead]);

  const imgChecker: boolean = data?.media && data?.media.length > 0 ? true : false;

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (data?.id !== undefined) {
      const newIsFavourite = !isFavourite;
      setIsFavourite(newIsFavourite);
      setIsClicked(true);
      updateLocaleStorage(data.id, 'isFavourite', newIsFavourite);
    }
  };

  const handleRead = () => {
    if (data?.id !== undefined) {
      const newHasRead = true;
      setHasRead(newHasRead);

      updateLocaleStorage(data.id, 'hasRead', newHasRead);
    }
  };

  return (
    <>
      {data ? (
        <a className='block' href={data?.url} target='_blank' onClick={handleRead}>
          <div
            className={`${hasRead ? 'absolute z-20 w-full h-full bg-foreground' : 'hidden'}`}
          ></div>
          <p className='absolute z-20 top-10 left-0 py-1 px-2 text-small font-medium text-contrastWhite bg-accentForeground rounded-r'>
            {data?.section}
          </p>
          {hasRead && (
            <p className='absolute z-10 top-3.5 right-3.5 md:top-5 md:right-5 text-base font-bold text-readBase flex items-center gap-1'>
              Already read
              <SvgIcon svgName='icon-check' size={18} className='fill-readBase' />
            </p>
          )}
          <div className='relative h-395px flex justify-center items-center overflow-hidden rounded-[10px]'>
            {imgChecker ? (
              <img
                className='rounded-xl max-w-none h-full absolute object-cover'
                src={data?.media && data?.media?.[0]?.['media-metadata']?.[2].url}
                alt={(data?.media && data?.media[0].caption) || 'plug image'}
              />
            ) : (
              <PlugImage variant='card' />
            )}
            <VoteButton onHandleClick={handleVote} isFavourite={isFavourite} />
          </div>
          <div className='px-4 mt-4'>
            <h2
              className={`h-[100px] md:h-[132px] mb-4 text-3xl md:text-4xl font-bold leading-tight tracking-mediumTight md:tracking-tighter line-clamp-3 dark:text-whiteBase`}
            >
              {data?.title}
            </h2>
            <p className='h-[57px] md:h-[66px] text-base md:text-medium leading-tight line-clamp-3 text-darkBase dark:text-whiteBase mb-4'>
              {data?.abstract}
            </p>
            <div className='flex justify-between'>
              <p className='text-base md:text-medium text-greyAlt'>{data?.published_date}</p>
              <p className='text-base md:text-medium text-accentBase'>Read more</p>
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
