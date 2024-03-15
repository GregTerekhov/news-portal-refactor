import React, { FC, useEffect, useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { CONFIG } from 'config';

const Hero: FC<{}> = () => {
  const [isVideoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [aspectWidth, setAspectWidth] = useState<number>(window.innerWidth);
  const [aspectHeight, setAspectHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setAspectWidth(window.innerWidth);
      setAspectHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const playerStyle = `h-16 md:h-20 w-16 md:w-20 rounded-xl shadow-darkCard border border-solid border-greyAlt/[.4] bg-whiteBase/[.9] bg-[url('/src/assets/images/right-button-100.png')] bg-center ${
    isVideoPlaying ? 'hidden' : ''
  }`;

  return (
    <div className='-mt-[82px] flex h-auto w-full items-center justify-center overflow-hidden md:-mt-[107px] lg:-mt-[114px] hg:-mt-[137px]'>
      <LiteYouTubeEmbed
        id={CONFIG.YOUTUBE_ID}
        title='YouTube video player'
        params='t=1s&ab_channel=TheNewYorkTimes'
        wrapperClass='w-full h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center'
        iframeClass='w-full h-screen'
        aspectWidth={aspectWidth}
        aspectHeight={aspectHeight}
        playlist={false}
        rel='prefetch'
        poster='maxresdefault'
        playerClass={playerStyle}
        onIframeAdded={() => setVideoPlaying(true)}
      />
    </div>
  );
};

export default Hero;
