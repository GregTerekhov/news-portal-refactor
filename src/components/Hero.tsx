import React, { FC } from 'react';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import desktopPlug from 'assets/images/desktopPlug.png';

interface IHardYouTube {
  id: string;
  title: string;
  params: string;
  activeClass: string;
}

const Hero: FC<{}> = () => {
  // const HardYouTube: IHardYouTube = new LiteYouTubeEmbed();

  return (
    <div className='w-full h-auto flex items-center justify-center -mt-[81px] md:-mt-[106px] lg:-mt-[113px]'>
      {/* <iframe
        width='100%'
        height='100%'
        loading='lazy'
        src='https://www.youtube.com/embed/_-EknzllWXI?si=0IpDB8HlUrQXxcjS&amp;controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&origin=https://www.youtube.com/'
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      ></iframe>  */}

      <LiteYouTubeEmbed
        id='_-EknzllWXI'
        title='YouTube video player'
        params='t=1s&ab_channel=TheNewYorkTimes'
        wrapperClass='w-full h-screen  bg-no-repeat bg-cover flex items-center justify-center'
        adNetwork={true}
        iframeClass='w-full h-screen'
        aspectWidth={window.innerWidth}
        aspectHeight={window.innerHeight}
        playlist={false}
        poster='maxresdefault'
        // playerClass={`h-[50px] w-[50px] bg-white bg-[url('${desktopPlug}')]`}
      />
    </div>
  );
};

export default Hero;
