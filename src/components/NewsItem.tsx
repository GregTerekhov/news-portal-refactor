import React from 'react';
import { VoteButton } from 'ui';
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
  const imgChecker: boolean = data?.media && data?.media.length > 0 ? true : false;

  return (
    <>
      <p className='absolute z-10 top-10 left-0 py-1 px-2 text-whiteBase bg-accentBase'>
        {data?.section}
      </p>
      <div className='relative h-395px'>
        {imgChecker ? (
          <img
            className='rounded-xl max-w-none h-full absolute left-50%-'
            src={data?.media && data?.media[0]['media-metadata'][2].url}
            alt={(data?.media && data?.media[0].caption) || 'plug image'}
          />
        ) : (
          <PlugImage variant='card' />
        )}
        <VoteButton />
      </div>
      <a href={data?.url} target='_blank'>
        <div className=''>
          <div className=''>
            <h2 className='my-5'>{data?.title}</h2>
            <p className=''>{data?.abstract}</p>
            <p className='markup-unit__card-date'>{data?.published_date}</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default NewsItem;
