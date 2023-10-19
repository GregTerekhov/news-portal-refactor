import React from 'react';
import { SvgIcon, VoteButton } from 'ui';
import PlugImage from './PlugImage';

type PopularData = {
  abstract: string;
  id: number;
  media: {
    caption: string;
    'media-metadata': {
      url: string;
    }[];
  }[];
  published_date: string;
  section: string;
  source: string;
  title: string;
  url: string;
};

const NewsItem = ({ data }: { data: Partial<PopularData> }) => {
  const alreadyRead = true;

  const imgChecker: boolean = data?.media && data?.media.length > 0 ? true : false;

  return (
    <>
      <p className='absolute z-10 top-10 left-0 py-1 px-2 text-small font-medium text-contrastWhite bg-accentBase'>
        {data?.section}
      </p>
      {alreadyRead && (
        <p className='absolute z-10 top-3.5 right-3.5 md:top-5 md:right-5 text-base font-bold text-readBase flex items-center gap-1'>
          Already read
          <SvgIcon svgName='icon-check' size={18} className='fill-readBase' />
        </p>
      )}
      <div className='relative h-395px flex justify-center items-center overflow-hidden rounded-[10px]'>
        {imgChecker ? (
          <img
            className='rounded-xl max-w-none h-full absolute object-cover'
            src={data?.media && data?.media[0]['media-metadata'][2].url}
            alt={(data?.media && data?.media[0].caption) || 'plug image'}
          />
        ) : (
          <PlugImage variant='card' />
        )}
        <VoteButton />
      </div>
      <a
        className=''
        href={data?.url}
        // target='_blank'
      >
        <div className='px-4 mt-4'>
          <h2
            className={`h-[100px] md:h-[132px] mb-4 text-3xl md:text-4xl font-bold leading-tight tracking-mediumTight md:tracking-tighter line-clamp-3`}
          >
            {data?.title}
          </h2>
          <p className='h-[57px] md:h-[66px] text-base md:text-medium leading-tight line-clamp-3 text-darkBase mb-4'>
            {data?.abstract}
          </p>
          <div className='flex justify-between'>
            <p className='markup-unit__card-date'>{data?.published_date}</p>
            <p className='text-base md:text-medium text-accentBase'>Read more</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default NewsItem;
