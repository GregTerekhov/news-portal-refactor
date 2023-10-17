import React from 'react';
import VoteButton from 'ui/VoteButton';
import { PlugImage } from '.';

type PopularData = {
  data: any;
};

const NewsItem = ({ data }: PopularData) => {
  console.log(data);

  const imgChecker: boolean = data.media.length > 0 ? true : false;

  return (
    <>
      <p className='absolute z-10 top-10 left-0 py-1 px-2 text-whiteBase bg-accentBase'>
        {data.section}
      </p>
      <div className='relative h-395px'>
        {imgChecker ? (
          <img
            className='rounded-xl max-w-none h-full absolute left-50%-'
            src={data.media[0]['media-metadata'][2].url}
            alt='placeholder'
          />
        ) : (
          <PlugImage variant='card' />
          // <div className=' max-w-none h-full bg-accentBase text-center '>PLACEHOLDER</div>
        )}
        <VoteButton />
      </div>
      <a
        className=''
        href={data.url}
        // target='_blank'
      >
        <div className=''>
          <div className=''>
            <h2 className='my-5'>{data.title}</h2>
            <p className=''>{data.abstract}</p>
            <p className='markup-unit__card-date'>{data.published_date}</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default NewsItem;
