import React, { FC, useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { Config, CONFIG } from 'config';

import { useCache } from 'hooks';
import { useAspectRatio } from './hooks';

const { YOUTUBE_IMAGE_URL, YOUTUBE_ID }: Config = CONFIG;

const Hero: FC = () => {
  const [isVideoPlaying, setVideoPlaying] = useState(false);

  const { width, height } = useAspectRatio();
  const { cacheImage } = useCache();

  const poster = cacheImage(`${YOUTUBE_IMAGE_URL}${YOUTUBE_ID}/maxresdefault.jpg`);

  const playerStyle = `h-16 md:h-20 w-16 md:w-20 rounded-xl shadow-darkCard border border-solid border-greyAlt/[.4] bg-whiteBase/[.9] bg-[url('/src/assets/images/right-button-100.png')] bg-center ${
    isVideoPlaying ? 'hidden' : ''
  }`;

  return (
    <div className='-mt-[82px] flex h-auto w-full items-center justify-center overflow-hidden md:-mt-[107px] lg:-mt-[114px] hg:-mt-[137px]'>
      <LiteYouTubeEmbed
        id={YOUTUBE_ID}
        adNetwork={true}
        title='YouTube video player'
        params='t=1s&ab_channel=TheNewYorkTimes'
        wrapperClass='w-full h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center'
        iframeClass='w-full h-screen'
        aspectWidth={width}
        aspectHeight={height}
        playlist={false}
        rel='preload'
        thumbnail={poster}
        playerClass={playerStyle}
        onIframeAdded={() => setVideoPlaying(!isVideoPlaying)}
      />
    </div>
  );
};

export default Hero;
