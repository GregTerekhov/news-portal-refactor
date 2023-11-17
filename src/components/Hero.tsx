import React, { FC } from 'react';

const Hero: FC = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center -mt-[81px] md:-mt-[106px] lg:-mt-[113px]'>
      <iframe
        width='100%'
        height='100%'
        loading='lazy'
        src='https://www.youtube.com/embed/_-EknzllWXI?si=0IpDB8HlUrQXxcjS&amp;controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&origin=https://www.youtube.com/'
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      ></iframe>
    </div>
  );
};

export default Hero;
