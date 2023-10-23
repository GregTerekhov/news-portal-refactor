import React from 'react';

const Hero = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center -mt-[81px] md:-mt-[106px] lg:-mt-[113px]'>
      <iframe
        width='100%'
        height='100%'
        src='https://www.youtube.com/embed/r8bMLcCxxAA?si=0U_Tgd5l3spoz-jv'
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      ></iframe>
    </div>
  );
};

export default Hero;
